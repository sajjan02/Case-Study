using SendGrid.Helpers.Mail;
using SendGrid;
using System.Net.Mail;
using System.Net;
namespace UserRegistrationMicroservices.Services
{
    public class SendEmailService
    {
        private readonly IConfiguration _configuration;
        
        public SendEmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void SendEmail(string toEmail, string subject, string body)
        {
            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var smtpClient = new SmtpClient(smtpSettings["Server"])
            {
                Port = int.Parse(smtpSettings["Port"]),
                Credentials = new NetworkCredential(smtpSettings["Username"], smtpSettings["Password"]),
                EnableSsl = bool.Parse(smtpSettings["EnableSsl"])
            };
            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpSettings["SenderEmail"], smtpSettings["SenderName"]),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(toEmail);
            smtpClient.Send(mailMessage);
        }
    }
}