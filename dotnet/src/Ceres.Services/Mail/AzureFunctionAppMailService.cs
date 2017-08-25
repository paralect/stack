using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Handlebars.Core;
using Microsoft.Azure.ServiceBus;
using Newtonsoft.Json;

namespace Ceres.Services.Mail
{
    public class AzureFunctionAppMailService : IMailService
    {
        private readonly IQueueClient _queueClient;
        private readonly string _templatesFolder;
        
        public AzureFunctionAppMailService(string connectionString, string queueName, string templatesFolder)
        {
            _queueClient = new QueueClient(connectionString, queueName);
            _templatesFolder = templatesFolder;
        }

        public Task Send(string to, string subject, string body)
        {
            var mailItem = new
            {
                To = to,
                Subject = subject,
                Body = body
            };

            var message = new Message(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(mailItem)));
            return _queueClient.SendAsync(message);
        }

        public Task Send(string to, string subject, string templateName, Dictionary<string, object> values)
        {
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

            return Send(to, subject, templateResult);
        }
    }
}