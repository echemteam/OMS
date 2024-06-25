using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ApprovalController : BaseController
    {
       
        private IServiceManager _serviceManager { get; }

        public ApprovalController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet("GetUserCheckList")]
        public async Task<IActionResult> GetUserCheckList(int eventId)
        {
            List<GetUserCheckListByEventIdResponse> responseData = await _serviceManager.approvalService.GetUserCheckList(eventId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
    }
}
