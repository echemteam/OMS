using OMS.Domain.Entities.API.Response.EmailTemplates;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.EmailTemplates;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class EmailTemplatesRepository : BaseRepository<EmailTemplates>, IEmailTemplatesRepository
    {
        #region SP Name
        const string GETEMAILTEMPLATESlIST = "GetEmailTemplatesList";
        const string ADDEDITEMAILTEMPLATES = "AddEditEmailTemplates";
        const string GETEMAILTEMPLATESBYID = "GetEmailTemplatesbyId";
        const string GETTEMPLATEBYFUNCTIONALITYEVENTID = "GetTemplateByFunctionalityEventId";
        #endregion

        public EmailTemplatesRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region EmailTemplates Repository
        public async Task<EntityList<EmailTemplatesListResponse>>GetEmailTemplatesList(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<EmailTemplatesListResponse>(GETEMAILTEMPLATESlIST, new
            {
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString,
            }, true);
        }
        public async Task<AddEntityDto<int>>AddEditEmailTemplate(EmailTemplatesDto addEditEmailTemplatesDto)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITEMAILTEMPLATES, new
            {
                addEditEmailTemplatesDto.EmailTemplateId,
                addEditEmailTemplatesDto.EmailTemplateName,
                addEditEmailTemplatesDto.Subject,
                addEditEmailTemplatesDto.EmailBody,
                addEditEmailTemplatesDto.IsActive,
                addEditEmailTemplatesDto.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetEmailTemplatesByIdResponse>GetEmailTemplateById(int emailTemplateId)
        {
            GetEmailTemplatesByIdResponse emailTemplates = await _context.GetFrist<GetEmailTemplatesByIdResponse>(GETEMAILTEMPLATESBYID, new
            {
                emailTemplateId
            }, CommandType.StoredProcedure);
            return emailTemplates;
        }
        public async Task<GetTemplateByFunctionalityEventIdResponse> GetTemplateByFunctionalityEventId(int? functionalityEventId)
        {
            GetTemplateByFunctionalityEventIdResponse emailTemplates = await _context.GetFrist<GetTemplateByFunctionalityEventIdResponse>(GETTEMPLATEBYFUNCTIONALITYEVENTID, new
            {
                functionalityEventId
            }, CommandType.StoredProcedure);
            return emailTemplates;
        }
        #endregion
    }
}
