using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ceres.Data;
using Ceres.Data.Entities.Auth;
using Ceres.Data.MongoDb;
using Ceres.Services;
using Ceres.WebApi.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace Ceres.WebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("http://localhost:45348").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });

            services.AddIdentityWithMongoStores($"{Configuration["MongoDbConfiguration:ConnectionString"]}/{Configuration["MongoDbConfiguration:DatabaseName"]}")
                .AddDefaultTokenProviders();

            services.Configure<JwtSettings>(Configuration.GetSection("JWTSettings"));

            RegisterComponents(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors("AllowSpecificOrigin");

            // Add JWT support
            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWTSettings:SecretKey"])),
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidAudience = Configuration["JWTSettings:Audience"],
                    ValidIssuer = Configuration["JWTSettings:Issuer"]
                }
            });

            app.UseMvc();
        }

        private void RegisterComponents(IServiceCollection services)
        {
            services.AddSingleton<IMongoDatabase>((_) =>
            {
                var mongoClient = new MongoClient(Configuration["MongoDbConfiguration:ConnectionString"]);
                return mongoClient.GetDatabase(Configuration["MongoDbConfiguration:DatabaseName"]);
            });

            services.AddSingleton<IDocumentRepository<User>, MongoDbDocumentRepository<User>>();
            services.AddTransient<IUserService, UserService>();
        }
    }
}
