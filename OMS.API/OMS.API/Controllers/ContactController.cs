using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
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

        [HttpPost("AddEditContact")]
        public async Task<IActionResult> AddEditContact(AddEditContactRequest requestData)
        {
            var addEditItem = await _serviceManager.contactService.AddEditContact(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }

        [HttpGet("GetContactByCustomerId")]
        public async Task<IActionResult> GetContactByCustomerId(int customerId, string? searchText, string? searchContactType)
        {
            List<GetContactByCustomerIdResponse> responseData = await _serviceManager.contactService.GetContactByCustomerId(customerId, searchText!, searchContactType!).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetCustomerContactByContactId")]
        public async Task<IActionResult> GetCustomerContactByContactId(int contactId)
        {
            if (contactId > 0)
            {
                GetCustomerContactByContactIdResponse responseData = await _serviceManager.contactService.GetCustomerContactByContactId(contactId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(contactId);
        }

        [HttpGet("GetContactBySupplierId")]
        public async Task<IActionResult> GetContactBySupplierId(int supplierId, string searchText, string searchContactType)
        {
            List<GetContactBySupplierIdResponse> responseData = await _serviceManager.contactService.GetContactBySupplierId(supplierId, searchText, searchContactType).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetSupllierContactByContact")]
        public async Task<IActionResult> GetSupllierContactByContactId(int contactId)
        {
            if (contactId > 0)
            {
                GetSupllierContactByContactIdResponse responseData = await _serviceManager.contactService.GetSupllierContactByContactId(contactId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(contactId);
        }
        #endregion

    }
}
