using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmailAddressController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public EmailAddressController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        [HttpPost("AddContactEmail")]
        public async Task<IActionResult> AddContactEmail(AddContactEmailRequest requestData)
        {
            var addItem = await _serviceManager.emailAddressService.AddContactEmail(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("UpdateContactEmail")]
        public async Task<IActionResult> UpdateContactEmail(UpdateContactEmailRequest requestData)
        {
            AddEntityDTO<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.emailAddressService.UpdateContactEmail(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }

        [HttpDelete("DeleteContactEmail")]
        public async Task<IActionResult> DeleteContactEmail(int emailId)
        {
            if (emailId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.emailAddressService.DeleteContactEmail(emailId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(emailId);
        }

        [HttpGet("GetEmailByContactId")]
        public async Task<IActionResult> GetEmailByContactId(int contactId)
        {
            List<GetEmailByContactIdResponse> responseData = await _serviceManager.emailAddressService.GetEmailByContactId(contactId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

    }
}
