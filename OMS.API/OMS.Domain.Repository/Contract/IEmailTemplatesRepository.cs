using OMS.Domain.Entities.API.Response.EmailTemplates;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.EmailTemplates;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IEmailTemplatesRepository
    {
        Task<EntityList<EmailTemplatesListResponse>>GetEmailTemplatesList(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDto<int>>AddEditEmailTemplate(EmailTemplatesDto requestData);
        Task<GetEmailTemplatesByIdResponse>GetEmailTemplateById(int emailTemplateId);
        Task<GetTemplateByFunctionalityEventIdResponse> GetTemplateByFunctionalityEventId(int? functionalityEventId);
    }
}
