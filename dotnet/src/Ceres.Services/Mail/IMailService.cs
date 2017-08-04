using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ceres.Services.Mail
{
    public interface IMailService
    {
        Task Send(string from, string to, string subject, string body);
        Task Send(string from, string to, string subject, string templateName, Dictionary<string, object> values);
    }
}
