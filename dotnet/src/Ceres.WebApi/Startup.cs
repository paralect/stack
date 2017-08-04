using System.IO;
using System.Security.Authentication;
using System.Text;
using Ceres.Services.Mail;
using Ceres.WebApi.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.MongoDB;
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
            services.Configure<JwtSettings>(Configuration.GetSection("JWTSettings"));
            
            // Add framework services.
            services.AddMvc();
            services.AddOptions();

            services.AddCors(options =>
            {
                var corsSettings = Configuration.GetSection("CorsSettings").Get<CorsSettings>();
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins(corsSettings.AllowedOrigins).AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });
           
            services.AddIdentity<IdentityUser, IdentityRole>();
            
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
            var serviceProvider = services.BuildServiceProvider();
            var env = serviceProvider.GetService<IHostingEnvironment>();

            services.AddSingleton<IMongoDatabase>((_) =>
            {
                var connectionString = Configuration["MongoDbConfiguration:ConnectionString"];
                var settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
                settings.SslSettings = new SslSettings
                {
                    EnabledSslProtocols = SslProtocols.Tls12
                };

                var client = new MongoClient(settings);
                var database = client.GetDatabase(Configuration["MongoDbConfiguration:DatabaseName"]);
                return database;
            });

            services.AddSingleton<IMailService>((_) =>
            {
                var domain = Configuration["MailgunSettings:Domain"];
                var apiKey = Configuration["MailGunSettings:ApiKey"];
                var templatesFolder = Path.Combine(env.ContentRootPath, "Templates");

                return new MailgunMailService(apiKey, domain, templatesFolder);
            });

            services.AddSingleton<IUserStore<IdentityUser>>(provider =>
            {
                var connectionString = Configuration["MongoDbConfiguration:ConnectionString"];
                var settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
                settings.SslSettings = new SslSettings
                {
                    EnabledSslProtocols = SslProtocols.Tls12
                };

                var client = new MongoClient(settings);
                var database = client.GetDatabase(Configuration["MongoDbConfiguration:DatabaseName"]);
                var collection = database.GetCollection<IdentityUser>("users");

                return new UserStore<IdentityUser>(collection);
            });
        }
    }
}
