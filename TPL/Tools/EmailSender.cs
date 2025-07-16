using System.Net;
using System.Net.Mail;

namespace TPLWeb.Tools
{
    public interface IEmailSender
    {
        Task SendEmailAsync(EmailModel email);
    }

    public class EmailSender : IEmailSender
    {
        public async Task SendEmailAsync(EmailModel email)
        {
            try
            {
                MailMessage message = new MailMessage()
                {
                    From = new MailAddress("info@kushaideas.ir", "سایت طوبی"),

                    To = { email.To },
                    Subject = email.Subject,
                    Body = email.Body,
                    IsBodyHtml = true
                };
                SmtpClient smtpClient = new SmtpClient("mail.kushaideas.ir", 587)
                {
                    Credentials = new NetworkCredential("_mainaccount@kushaideas.ir", "Zp1q10t2Cm"),
                    EnableSsl = false
                };
                smtpClient.Send(message);
                await Task.CompletedTask;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }

    public class EmailModel
    {
        public EmailModel(string to, string subject, string body)
        {
            To = to;
            Subject = subject;
            Body = body;
        }

        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}