using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace TPLWeb.Tools
{
    public interface IEmailSender
    {
        Task SendEmailAsync(EmailModel email);
    }

    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailSender> _logger;

        public EmailSender(IConfiguration configuration, ILogger<EmailSender> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(EmailModel email)
        {
            try
            {
                var smtpSettings = _configuration.GetSection("EmailSettings");
                var host = smtpSettings["SmtpHost"];
                var port = int.Parse(smtpSettings["SmtpPort"] ?? "587");
                var username = smtpSettings["SmtpUsername"];
                var password = smtpSettings["SmtpPassword"];
                var fromEmail = smtpSettings["FromEmail"];
                var fromName = smtpSettings["FromName"];

                MailMessage message = new MailMessage()
                {
                    From = new MailAddress(fromEmail, fromName),
                    To = { email.To },
                    Subject = email.Subject,
                    Body = email.Body,
                    IsBodyHtml = true
                };

                SmtpClient smtpClient = new SmtpClient(host, port)
                {
                    Credentials = new NetworkCredential(username, password),
                    EnableSsl = bool.Parse(smtpSettings["EnableSsl"] ?? "true")
                };

                await smtpClient.SendMailAsync(message);
                _logger.LogInformation("Email sent successfully to {Email}", email.To);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to {Email}", email.To);
                throw new InvalidOperationException("Failed to send email", ex);
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