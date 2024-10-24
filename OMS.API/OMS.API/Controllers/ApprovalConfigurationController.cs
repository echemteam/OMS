using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Request.Functionalities;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
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
            if (approvalConfigurationId > 0)
            {
                var approvalConfigurationDetails = await _serviceManager.approvalConfigurationServices.GetApprovalConfigurationByApprovalConfigurationId(approvalConfigurationId).ConfigureAwait(true);
                return APISucessResponce(approvalConfigurationDetails);
            }
            return APISucessResponce(approvalConfigurationId);
        }
        [HttpPost("GetApprovalConfigurationRules")]
        public async Task<IActionResult> GetApprovalConfigurationRules(GetApprovalConfigurationRulesRequest requestData)
        {
            var approvalConfigurationRulesList = await _serviceManager.approvalConfigurationServices.GetApprovalConfigurationRules(requestData).ConfigureAwait(true);
            return APISucessResponce(approvalConfigurationRulesList);
        }
        [HttpPost("GetFunctionalities")]
        public async Task<IActionResult> GetFunctionalities(GetFunctionalitiesRequest requestData)
        {
            var functionalities = await _serviceManager.approvalConfigurationServices.GetFunctionalities(requestData);
            return APISucessResponce<object>(functionalities);
        }
        [HttpPost("GetFunctionalityEvents")]
        public async Task<IActionResult> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData)
        {
            var functionalityEvents = await _serviceManager.approvalConfigurationServices.GetFunctionalityEvents(requestData);
            return APISucessResponce<object>(functionalityEvents);
        }
        [HttpPost("AddFunctionalitiesResponsiblesUser")]
        public async Task<IActionResult> AddFunctionalitiesResponsiblesUser(AddFunctionalitiesResponsiblesUserRequest requestData)
        {
            var updateItem = await _serviceManager.approvalConfigurationServices.AddFunctionalitiesResponsiblesUser(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }
        [HttpDelete("DeleteFunctionalitiesResponsiblesUser")]
        public async Task<IActionResult> DeleteFunctionalitiesResponsiblesUser(int functionalitiesResponsiblesId)
        {
            if (functionalitiesResponsiblesId > 0)
            {
                var deleteItem = await _serviceManager.approvalConfigurationServices.DeleteFunctionalitiesResponsiblesUser(functionalitiesResponsiblesId);
                return APISucessResponce(deleteItem);
            }
            return APISucessResponce(functionalitiesResponsiblesId);
        }
        [HttpPost("GetFunctionalitiesResponsibles")]
        public async Task<IActionResult> GetFunctionalitiesResponsibles(GetFunctionalitiesResponsiblesRequest requestData)
        {
            var functionalitiesResponsibles = await _serviceManager.approvalConfigurationServices.GetFunctionalitiesResponsibles(requestData);
            return APISucessResponce<object>(functionalitiesResponsibles);
        }
        [HttpPost("AddEditFunctionalities")]
        public async Task<IActionResult> AddEditFunctionalities(AddEditFunctionalitiesRequest requestData)
        {
            var addEditItem = await _serviceManager.approvalConfigurationServices.AddEditFunctionalities(requestData);
            return APISucessResponce(addEditItem);
        }
        #endregion
    }
}

