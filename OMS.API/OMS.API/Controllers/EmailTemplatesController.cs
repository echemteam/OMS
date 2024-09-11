using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.EmailTemplates;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmailTemplatesController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public EmailTemplatesController(ICommonSettingService commonSettingService, IServiceManager serviceManager): base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region EmailTemplates API
        [HttpPost("GetEmailTemplatesList")]
        public async Task<IActionResult>GetEmailTemplatesList([FromBody] ListEntityRequest<BaseFilter> requestData)
        {
            var emailList = await _serviceManager.emailTemplatesService.GetEmailTemplatesList(requestData);
            return APISucessResponce<object>(emailList);
        }

        [HttpPost("AddEditEmailTemplate")]
        public async Task<IActionResult>AddEditEmailTemplate(AddEditEmailTemplatesRequest requestData)
        {
            var emailTemplatesData = await _serviceManager.emailTemplatesService.AddEditEmailTemplate(requestData, CurrentUserId);
            return APISucessResponce(emailTemplatesData);
        }

        [HttpGet("GetEmailTemplateById")]
        public async Task<IActionResult>GetEmailTemplateById(int emailTemplateId)
        {
            if (emailTemplateId > 0)
            {
                var dictionary = await _serviceManager.emailTemplatesService.GetEmailTemplateById(emailTemplateId).ConfigureAwait(true);
                return APISucessResponce<object>(dictionary);
            }
            return APISucessResponce(emailTemplateId);
        }
        #endregion
    }
}
