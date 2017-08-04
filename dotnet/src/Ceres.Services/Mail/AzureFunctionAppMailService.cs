using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.ServiceBus;

namespace Ceres.Services.Mail
{
    public class AzureFunctionAppMailService : IMailService
    {
        private readonly IQueueClient _queueClient;
        private readonly string _templatesFolderName;
       
        public AzureFunctionAppMailService(string connectionString, string queueName, string templatesFolderName)
        {
            _queueClient = new QueueClient(connectionString, queueName);
            _templatesFolderName = templatesFolderName;
        }

        public Task Send(string from, string to, string subject, string body)
        {
            throw new NotImplementedException();
        }

        public Task Send(string from, string to, string subject, string templateName, Dictionary<string, object> values)
        {
            throw new NotImplementedException();
        }
    }
}