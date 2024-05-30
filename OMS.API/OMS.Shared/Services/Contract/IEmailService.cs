using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Shared.Services.Contract
{
    public interface IEmailService
    {
        bool SendEmailAsync(string subject, string body);
        void SendErrorEmail(ExceptionLogDTO errorLog);
    }
}
