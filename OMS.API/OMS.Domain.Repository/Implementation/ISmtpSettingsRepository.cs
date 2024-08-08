using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;

namespace OMS.Domain.Repository.Implementation
{
    public interface ISmtpSettingsRepository
    {
        Task<AddEntityDto<int>> AddEditSmtpSettings(SmtpSettingsDto requestData);
        Task<GetSmtpSettingsResponse> GetSmtpSettings();

    }
}
