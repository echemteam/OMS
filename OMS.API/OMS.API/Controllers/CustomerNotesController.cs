using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.CustomerNotes;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;
namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerNotesController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public CustomerNotesController(ICommonSettingService commonSettingService,IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region API
        [HttpPost("AddCustomerNotes")]
        public async Task<IActionResult> AddCustomerNotes(AddCustomerNotesRequest requestData)
        {

            var addNotes = await _serviceManager.customerNotesService.AddCustomerNotes(requestData, CurrentUserId);
            return APISucessResponce(addNotes);
        }

        [HttpPost("UpdateCustomerNotes")]
        public async Task<IActionResult> UpdateCustomerNotes(UpdateCustomerNotesRequest requestData)
        {
            AddEntityDTO<long> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.customerNotesService.UpdateCustomerNotes(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
        }

        [HttpGet("GetCustomerNoteByCustomerId")]
        public async Task<IActionResult> GetCustomerNoteByCustomerId(int customerId)
        {
            List<GetCustomerNotesByCustomerIdResponse> responseData = await _serviceManager.customerNotesService.GetCustomerNoteByCustomerId(customerId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        #endregion
    }
}
