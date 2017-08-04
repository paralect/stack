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

        private const string BaseUri = "https://api.mailgun.net/v3";

        public MailgunMailService(string apiKey, string domain, string templatesFolder)
        {
            _templatesFolder = templatesFolder;
            _client = new RestClient(Path.Combine(BaseUri, domain)) {Authenticator = new HttpBasicAuthenticator("api", apiKey)};
        }

        public Task Send(string from, string to, string subject, string body)
        {
            var request = new RestRequest("messages");
            request.AddParameter("from", from);
            request.AddParameter("to", to);
            request.AddParameter("subject", subject);
            request.AddParameter("html", body);
            request.Method = Method.POST;

            var taskCompletion = new TaskCompletionSource<IRestResponse>();
            var handle = _client.ExecuteAsync(request, (Callback));
            return taskCompletion.Task;
        }

        private void Callback(IRestResponse restResponse)
        {
            var status = restResponse.ResponseStatus;
        }

        public Task Send(string from, string to, string subject, string templateName, Dictionary<string, object> values)
        {
            var request = new RestRequest("messages");
            request.AddParameter("from", from);
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