using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ApprovalConfigurationController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public ApprovalConfigurationController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion
        #region Approval Configuration API
        [HttpPost("AddEditApprovalConfiguration")]
        public async Task<IActionResult> AddEditApprovalConfiguration(AddEditApprovalConfigurationRequest requestData)
        {
            var addEditItem = await _serviceManager.approvalConfigurationServices.AddEditApprovalConfiguration(requestData);
            return APISucessResponce(addEditItem);
        }

        [HttpGet("GetApprovalConfigurationByApprovalConfigurationId")]
        public async Task<IActionResult> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId)
        {
            List<GetApprovalConfigurationByApprovalConfigurationIdResponse> responseData = await _serviceManager.approvalConfigurationServices.GetApprovalConfigurationByApprovalConfigurationId(approvalConfigurationId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        [HttpGet("GetApprovalConfigurationRulesByModuleIdAndFunctionalityId")]
        public async Task<IActionResult> GetApprovalConfigurationRulesByModuleIdAndFunctionalityId(int moduleId, int functionalityId)
        {
            List<GetApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse> responseData = await _serviceManager.approvalConfigurationServices.GetApprovalConfigurationRulesByModuleIdAndFunctionalityId(moduleId, functionalityId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        #endregion
    }
}
