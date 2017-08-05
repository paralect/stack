#r "Newtonsoft.Json"

#load "..\shared\MailItem.csx"
#load "SMTPSettings.csx"
#load "settings.csx"

using System;
using System.Net.Mail;
using System.Threading.Tasks;

using Newtonsoft.Json;

public static void Run(string queueItem, TraceWriter log)
{
    log.Info("Mailer started.");

    var mailItem = JsonConvert.DeserializeObject<MailItem>(queueItem);

    var settings = GetSMTPSettings();

    log.Info($"{mailItem.Subject} {mailItem.Body}");

    var message = new MailMessage();
    message.To.Add(new MailAddress(mailItem.To));
    message.From = new MailAddress(settings.From);
	message.Subject = mailItem.Subject;
    message.Body = mailItem.Body;
    message.IsBodyHtml = true;

    var client = new SmtpClient(settings.Host);
    client.Credentials = new System.Net.NetworkCredential(settings.User, settings.Passwd);

    //client.Send(message);

    log.Info("Mail sent.");
}