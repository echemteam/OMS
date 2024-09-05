using OMS.Domain.Entities.API.Request.EmailTemplates;
using OMS.Domain.Entities.API.Response.EmailTemplates;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.EmailTemplates
{
    public interface IEmailTemplatesService
    {
        Task<EntityList<EmailTemplatesListResponse>>GetEmailTemplatesList(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDto<int>>AddEditEmailTemplate(AddEditEmailTemplatesRequest requestData, short CurrentUserId);
        Task<GetEmailTemplatesByIdResponse>GetEmailTemplateById(int emailTemplateId);
    }
}
