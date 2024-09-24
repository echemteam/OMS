using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    //[CheckClientIpActionFilter]
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

        [HttpPost("AddEditOrganizationBankDetails")]
        public async Task<IActionResult> AddEditOrganizationBankDetails(AddEditOrganizationBankDetailsRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationBankDetails(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationBankDetails")]
        public async Task<IActionResult> GetOrganizationBankDetails()
        {
            var organizationBankDetails = await _serviceManager.organizationService.GetOrganizationBankDetails().ConfigureAwait(true);
            return APISucessResponce<object>(organizationBankDetails);
        }
        [HttpPost("AddEditOrganizationAccountingDetails")]
        public async Task<IActionResult> AddEditOrganizationAccountingDetails(AddEditOrganizationAccountingDetailsRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationAccountingDetails(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationAccountingDetails")]
        public async Task<IActionResult> GetOrganizationAccountingDetails()
        {
            var organizationAccountingDetails = await _serviceManager.organizationService.GetOrganizationAccountingDetails().ConfigureAwait(true);
            return APISucessResponce<object>(organizationAccountingDetails);
        }
        [HttpPost("AddEditOrganizationShippingCharges")]
        public async Task<IActionResult> AddEditOrganizationShippingCharges(AddEditOrganizationShippingChargesRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationShippingCharges(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationShippingCharges")]
        public async Task<IActionResult> GetOrganizationShippingCharges()
        {
            var organizationShippingCharges = await _serviceManager.organizationService.GetOrganizationShippingCharges().ConfigureAwait(true);
            return APISucessResponce<object>(organizationShippingCharges);
        }
        [HttpPost("AddEditOrganizationOtherCharges")]
        public async Task<IActionResult> AddEditOrganizationOtherCharges(AddEditOrganizationOtherChargesRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditOrganizationOtherCharges(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationOtherCharges")]
        public async Task<IActionResult> GetOrganizationOtherCharges()
        {
            var organizationOtherCharges = await _serviceManager.organizationService.GetOrganizationOtherCharges().ConfigureAwait(true);
            return APISucessResponce<object>(organizationOtherCharges);
        }
        [HttpPost("AddEditBusinessAddresses")]
        public async Task<IActionResult> AddEditBusinessAddresses(AddEditOrganizationBusinessAddressesRequest requestData)
        {
            var addEditItem = await _serviceManager.organizationService.AddEditBusinessAddresses(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetOrganizationBusinessAddresses")]
        public async Task<IActionResult> GetOrganizationBusinessAddresses()
        {
            var organizationBusinessAddresses = await _serviceManager.organizationService.GetOrganizationBusinessAddresses().ConfigureAwait(true);
            return APISucessResponce<object>(organizationBusinessAddresses);
        }
        [HttpPost("GetOrganizationHistorys")]
        public async Task<IActionResult> GetUsers(GetOrganizationHistoryRequest requestData)
        {
            var organizationHistoryList = await _serviceManager.organizationService.GetOrganizationHistorys(requestData);
            return APISucessResponce<object>(organizationHistoryList);
        }
        #endregion
    }
}
