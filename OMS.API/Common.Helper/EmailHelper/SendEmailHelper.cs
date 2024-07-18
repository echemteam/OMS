using System.Net;
using System.Net.Mail;

namespace Common.Helper.EmailHelper
{
    public class SendEmailHelper
    {
        public string To { get; set; }
        public string Cc { get; set; }
        public string Bcc { get; set; }
        public string FromEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string HostName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool EnableSsl { get; set; } = true;
        public bool EnableSendMail { get; set; } = true;
        public int Port { get; set; } = 1;
        public SmtpDeliveryMethod DeliveryMethod { get; set; } = SmtpDeliveryMethod.Network;

        public SendEmailHelper()
        {
            Cc = string.Empty;
            Bcc = string.Empty;
            To = string.Empty;
        }

        public bool SendEmail()
        {
            try
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(FromEmail),
                    Subject = Subject,
                    Body = Body,
                    IsBodyHtml = true
                };

                AddEmailAddresses(To, mailMessage.To);
                AddEmailAddresses(Cc, mailMessage.CC);
                AddEmailAddresses(Bcc, mailMessage.Bcc);

                using (var smtpClient = new SmtpClient(HostName, Port)
                {
                    Credentials = new NetworkCredential(FromEmail, Password),
                    EnableSsl = EnableSsl,
                    DeliveryMethod = DeliveryMethod
                })
                {
                    smtpClient.Send(mailMessage);
                }

                return true;
            }
            catch (Exception ex)
            {
                // Log the exception (logging logic to be implemented as needed)
                Console.WriteLine($"Failed to send email: {ex.Message}");
                return false;
            }
        }

        private void AddEmailAddresses(string addresses, MailAddressCollection addressCollection)
        {
            if (string.IsNullOrEmpty(addresses)) return;

            var addressList = addresses.Split(';');
            foreach (var address in addressList)
            {
                if (!string.IsNullOrEmpty(address))
                {
                    addressCollection.Add(new MailAddress(address));
                }
            }
        }


    }
}
