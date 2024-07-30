using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Organization;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrganizationController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public OrganizationController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Organization Profile API
        [HttpPost("AddEditOrganizationProfile")]
        public async Task<IActionResult> AddEditOrganizationProfile(AddEditOrganizationProfileRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationProfile(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationProfile")]
        public async Task<IActionResult> GetOrganizationProfile()
        {
            var organizationProfileDetails = await _serviceManager.organizationService.GetOrganizationProfile().ConfigureAwait(true);
            return APISucessResponce<object>(organizationProfileDetails);
        }

        [HttpPost("AddEditSmtpSettings")]
        public async Task<IActionResult> AddEditSmtpSettings(AddEditSmtpSettingsRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditSmtpSettings(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetSmtpSettings")]
        public async Task<IActionResult> GetSmtpSettings()
        {
            var organizationProfileDetails = await _serviceManager.organizationService.GetSmtpSettings().ConfigureAwait(true);
            return APISucessResponce<object>(organizationProfileDetails);
        }

        [HttpPost("AddEditOrganizationOtherSettings")]
        public async Task<IActionResult> AddEditOrganizationOtherSettings(AddEditOrganizationOtherSettingsRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationOtherSettings(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationOtherSettings")]
        public async Task<IActionResult> GetOrganizationOtherSettings()
        {

            var organizationOtherSettingDetails = await _serviceManager.organizationService.GetOrganizationOtherSettings().ConfigureAwait(true);
            return APISucessResponce<object>(organizationOtherSettingDetails);
        }
        [HttpPost("AddEditOrganizationContactDetails")]
        public async Task<IActionResult> AddEditOrganizationContactDetails(AddEditOrganizationContactDetailsRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationContactDetails(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }

        [HttpGet("GetOrganizationContactDetails")]
        public async Task<IActionResult> GetOrganizationContactDetails()
        {
            var organizationContactDetails = await _serviceManager.organizationService.GetOrganizationContactDetails().ConfigureAwait(true);
            return APISucessResponce<object>(organizationContactDetails);
        }
        [HttpPost("AddEditOrganizationLogisticDetails")]
        public async Task<IActionResult> AddEditOrganizationLogisticDetails(AddEditOrganizationLogisticDetailsRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationLogisticDetails(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationLogisticDetails")]
        public async Task<IActionResult> GetOrganizationLogisticDetails()
        {
            var organizationLogisticDetails = await _serviceManager.organizationService.GetOrganizationLogisticDetails().ConfigureAwait(true);
            return APISucessResponce<object>(organizationLogisticDetails);
        }
        #endregion
    }
}
