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

        [HttpPost("AddEditContact")]
        public async Task<IActionResult> AddContact(AddEditContactRequest requestData)
        {

            var addEditItem = await _serviceManager.contactService.AddEditContact(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }


        [HttpGet("GetContactByCustomerId")]
        public async Task<IActionResult> GetContactByCustomerId(int customerId)
        {
            List<GetContactByCustomerIdResponse> responseData = await _serviceManager.contactService.GetContactByCustomerId(customerId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        #endregion

    }
}
