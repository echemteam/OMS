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
    public class ContactController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public ContactController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Contact API

        [HttpPost("AddContact")]
        public async Task<IActionResult> AddContact(AddContactRequest requestData)
        {

            var addItem = await _serviceManager.contactService.AddContact(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }


        [HttpGet("GetContactByCustomerIdId")]
        public async Task<IActionResult> GetContactByCustomerIdId(int customerId)
        {
            List<GetContactByCustomerIdResponse> responseData = await _serviceManager.contactService.GetContactByCustomerIdId(customerId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpPost("AddContactEmail")]
        public async Task<IActionResult> AddContactEmail(AddContactEmailRequest requestData)
        {
            var addItem = await _serviceManager.contactService.AddContactEmail(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("AddContactPhone")]
        public async Task<IActionResult> AddContactPhone(AddContactPhoneRequest requestData)
        {

            var addItem = await _serviceManager.contactService.AddContactPhone(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("UpdateContactEmail")]
        public async Task<IActionResult> UpdateContactEmail(UpdateContactEmailRequest requestData)
        {
            AddEntityDTO<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.contactService.UpdateContactEmail(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }

        [HttpPost("UpdateContactPhone")]
        public async Task<IActionResult> UpdateContactPhone(UpdateContactPhoneRequest requestData)
        {
            AddEntityDTO<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.contactService.UpdateContactPhone(requestData, CurrentUserId);
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
                var deleteItem = await _serviceManager.contactService.DeleteContactEmail(emailId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(emailId);
        }

        [HttpDelete("DeleteContactPhone")]
        public async Task<IActionResult> DeleteContactPhone(int phoneId)
        {
            if (phoneId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.contactService.DeleteContactPhone(phoneId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(phoneId);
        }
        #endregion

    }
}
