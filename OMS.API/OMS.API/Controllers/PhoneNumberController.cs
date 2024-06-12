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
    public class PhoneNumberController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public PhoneNumberController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        [HttpPost("AddContactPhone")]
        public async Task<IActionResult> AddContactPhone(AddContactPhoneRequest requestData)
        {

            var addItem = await _serviceManager.phoneNumberService.AddContactPhone(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpGet("GetPhoneByContactId")]
        public async Task<IActionResult> GetPhoneByContactId(int contactId)
        {
            List<GetPhoneByContactIdResponse> responseData = await _serviceManager.phoneNumberService.GetPhoneByContactId(contactId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }


        [HttpPost("UpdateContactPhone")]
        public async Task<IActionResult> UpdateContactPhone(UpdateContactPhoneRequest requestData)
        {
            AddEntityDTO<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.phoneNumberService.UpdateContactPhone(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }


        [HttpDelete("DeleteContactPhone")]
        public async Task<IActionResult> DeleteContactPhone(int phoneId)
        {
            if (phoneId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.phoneNumberService.DeleteContactPhone(phoneId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(phoneId);
        }

    }
}
