using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Organization;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        [HttpGet("GetOrganizationProfileByOrganizationId")]
        public async Task<IActionResult> GetOrganizationProfileByOrganizationId(byte organizationId)
        {
            if (organizationId > 0)
            {
                var organizationProfileDetails = await _serviceManager.organizationService.GetOrganizationProfileByOrganizationId(organizationId).ConfigureAwait(true);
                return APISucessResponce<object>(organizationProfileDetails);
            }
            return APISucessResponce(organizationId);
        }

        [HttpPost("AddEditSmtpSettings")]
        public async Task<IActionResult> AddEditSmtpSettings(AddEditSmtpSettingsRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditSmtpSettings(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetSmtpSettingsBySmtpSettingId")]
        public async Task<IActionResult> GetSmtpSettingsBySmtpSettingId(short smtpSettingId)
        {
            if (smtpSettingId > 0)
            {
                var organizationProfileDetails = await _serviceManager.organizationService.GetSmtpSettingsBySmtpSettingId(smtpSettingId).ConfigureAwait(true);
                return APISucessResponce<object>(organizationProfileDetails);
            }
            return APISucessResponce(smtpSettingId);
        }

        [HttpPost("AddEditOrganizationOtherSettings")]
        public async Task<IActionResult> AddEditOrganizationOtherSettings(AddEditOrganizationOtherSettingsRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationOtherSettings(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationOtherSettingsById")]
        public async Task<IActionResult> GetOrganizationOtherSettingsById(int organizationOtherSettingId)
        {
            if (organizationOtherSettingId > 0)
            {
                var organizationOtherSettingDetails = await _serviceManager.organizationService.GetOrganizationOtherSettingsById(organizationOtherSettingId).ConfigureAwait(true);
                return APISucessResponce<object>(organizationOtherSettingDetails);
            }
            return APISucessResponce(organizationOtherSettingId);
        }

        #endregion
    }
}
