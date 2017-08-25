using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Handlebars.Core;
using RestSharp;
using RestSharp.Authenticators;

namespace Ceres.Services.Mail
{
    public class MailgunMailService : IMailService
    {
        private readonly RestClient _client;
        private readonly string _templatesFolder;
        private readonly string _from;

        private const string BaseUri = "https://api.mailgun.net/v3";

        public MailgunMailService(string from, string apiKey, string domain, string templatesFolder)
        {
            if (string.IsNullOrEmpty(from)) throw new ArgumentException(nameof(from));
            if (string.IsNullOrEmpty(apiKey)) throw new ArgumentException(nameof(apiKey));
            if (string.IsNullOrEmpty(domain)) throw new ArgumentException(nameof(domain));
            if (string.IsNullOrEmpty(templatesFolder)) throw new ArgumentException(nameof(templatesFolder));

            _templatesFolder = templatesFolder;
            _from = from;
            _client = new RestClient(Path.Combine(BaseUri, domain)) {Authenticator = new HttpBasicAuthenticator("api", apiKey)};
        }

        public Task Send(string to, string subject, string body)
        {
            var request = new RestRequest("messages");
            request.AddParameter("from", _from);
            request.AddParameter("to", to);
            request.AddParameter("subject", subject);
            request.AddParameter("html", body);
            request.Method = Method.POST;

            var taskCompletion = new TaskCompletionSource<IRestResponse>();
            var handle = _client.ExecuteAsync(request, response => { taskCompletion.SetResult(response); });
            return taskCompletion.Task;
        }
        
        public Task Send(string to, string subject, string templateName, Dictionary<string, object> values)
        {
            var request = new RestRequest("messages");
            request.AddParameter("from", _from);
            request.AddParameter("to", to);
            request.AddParameter("subject", subject);

            var handlebars = new HandlebarsEngine();
            string templateContent;

            using (var stream = new FileStream(Path.Combine(_templatesFolder, templateName), FileMode.Open))
            {
                using (var reader = new StreamReader(stream))
                {
                    templateContent = reader.ReadToEnd();
                }
            }
            
            var template = handlebars.Compile(templateContent);
            var templateResult = template.Render(values);

            request.AddParameter("html", templateResult);
            request.Method = Method.POST;

            var taskCompletion = new TaskCompletionSource<IRestResponse>();
            var handle = _client.ExecuteAsync(request, response => { taskCompletion.SetResult(response); });
            return taskCompletion.Task;
        }
    }
}