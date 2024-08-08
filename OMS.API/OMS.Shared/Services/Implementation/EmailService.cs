using Common.Helper.EmailHelper;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Services.Contract;
using System.Net.Mail;

namespace OMS.Shared.Services.Implementation
{
    public class EmailService : IEmailService
    {
        private readonly ICommonSettingService _commonSettingService;

        public EmailService(ICommonSettingService commonSettingService)
        {
            _commonSettingService = commonSettingService;
        }

        public bool SendEmailAsync(string subject, string body)
        {
            try
            {
                SendEmailHelper objEmail = new()
                {
                    HostName = _commonSettingService.EmailSettings.HostName!,
                    Port = int.Parse(_commonSettingService.EmailSettings.Port!),
                    FromEmail = _commonSettingService.EmailSettings.FromEmail!,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Password = _commonSettingService.EmailSettings.Password!,
                    To = _commonSettingService.EmailSettings.ErrorEmailTo!,
                    EnableSsl = Convert.ToBoolean(_commonSettingService.EmailSettings.EnableSSL),
                    Subject = subject,
                    Body = body
                };
                bool mail = objEmail.SendEmail();
                return mail;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while sending the email.", ex);
            }
        }

        public void SendErrorEmail(ExceptionLogDto exceptionLog)
        {
            string? subject = $@"Error in OMS Project";
            string? body = $"SystemErrorMessage :{exceptionLog.SystemErrorMessage}{Environment.NewLine}TrackTrace :-{exceptionLog.TrackTrace}{Environment.NewLine}InnerSystemErrorMessage :- {exceptionLog.InnerSystemErrorMessage}";
            SendEmailAsync(subject, body);
        }
    }
}
