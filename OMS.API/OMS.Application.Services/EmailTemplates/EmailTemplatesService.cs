using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.EmailTemplates;
using OMS.Domain.Entities.API.Response.EmailTemplates;
using OMS.Domain.Entities.API.Response.Snippet;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.EmailTemplates;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;
using System.Text;


namespace OMS.Application.Services.EmailTemplates
{
    internal class EmailTemplatesService : BaseServices, IEmailTemplatesService
    {
        #region private variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public EmailTemplatesService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        #region EmailTemplates Service
        public async Task<EntityList<EmailTemplatesListResponse>> GetEmailTemplatesList(ListEntityRequest<BaseFilter> requestData)
        {
            return await repositoryManager.emailTemplates.GetEmailTemplatesList(requestData);
        }
        public async Task<AddEntityDto<int>> AddEditEmailTemplate(AddEditEmailTemplatesRequest requestData, short CurrentUserId)
        {
            EmailTemplatesDto templatesDto = requestData.ToMapp<AddEditEmailTemplatesRequest, EmailTemplatesDto>();
            templatesDto.CreatedBy = CurrentUserId;
            return await repositoryManager.emailTemplates.AddEditEmailTemplate(templatesDto);
        }
        public async Task<GetEmailTemplatesByIdResponse> GetEmailTemplateById(int emailTemplateId)
        {
            GetEmailTemplatesByIdResponse emailTemplate = await repositoryManager.emailTemplates.GetEmailTemplateById(emailTemplateId);
            //List<GetSnippetEmailSnippetByEmailTemplateIdResponse> emailTemplateSnippets = await repositoryManager.snippet.GetSnippetEmailSnippetByEmailTemplateId(emailTemplateId);
            //var modifiedEmailBody = new StringBuilder(emailTemplate.EmailBody);

            //foreach (var snippet in emailTemplateSnippets)
            //{
            //    if (!string.IsNullOrEmpty(snippet.Hashtag) && !string.IsNullOrEmpty(snippet.Body))
            //    {
            //        if (modifiedEmailBody.ToString().Contains(snippet.Hashtag))
            //        {
            //            modifiedEmailBody.Replace(snippet.Hashtag, snippet.Body);
            //        }
            //    }
            //}
            //emailTemplate.EmailBody = modifiedEmailBody.ToString();
            return emailTemplate;
        }
        #endregion
    }
}
