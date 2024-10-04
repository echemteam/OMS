using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.SupplierAccoutingSetting;
using OMS.Domain.Entities.API.Request.supplierPaymentSettings;
using OMS.Domain.Entities.API.Response.SuppierBankDetails;
using OMS.Domain.Entities.API.Response.SupplierFinancialSettings;
using OMS.Domain.Entities.API.Response.supplierPaymentSettings;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    //[CheckClientIpActionFilter]
    public class SupplierFinancialSettingsController : BaseController
    {
        #region Private Variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public SupplierFinancialSettingsController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion
        #region Supplier Financial Settings API
        [HttpPost("AddEditACHWire")]
        public async Task<IActionResult> AddEditACHWire(AddEditACHWireRequest requestData)
        {
            var addEditItem = await _serviceManager.supplierFinancialSettingsService.AddEditACHWire(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }

        [HttpPost("AddEditCreditCard")]
        public async Task<IActionResult> AddEditCreditCard(AddEditCreditCardRequest requestData)
        {
            var addEditItem = await _serviceManager.supplierFinancialSettingsService.AddEditCreditCard(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpPost("AddEditCheck")]
        public async Task<IActionResult> AddEditCheck(AddEditCheckRequest requestData)
        {
            var addEditItem = await _serviceManager.supplierFinancialSettingsService.AddEditCheck(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpPost("AddEditOther")]
        public async Task<IActionResult> AddEditOther(AddEditOtherRequest requestData)
        {
            var addEditItem = await _serviceManager.supplierFinancialSettingsService.AddEditOther(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetSupplierFinancialSettingsBySupplierId")]
        public async Task<IActionResult> GetSupplierFinancialSettingsBySupplierId(int supplierId)
        {
            if (supplierId > 0)
            {
                GetSupplierFinancialSettingsBySupplierIdResponse responseData = await _serviceManager.supplierFinancialSettingsService.GetSupplierFinancialSettingsBySupplierId(supplierId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(supplierId);
        }
        [HttpGet("GetACHWireBySupplierId")]
        public async Task<IActionResult> GetACHWireBySupplierId(int supplierId)
        {
            if (supplierId > 0)
            {
                GetACHWireBySupplierIdResponse responseData = await _serviceManager.supplierFinancialSettingsService.GetACHWireBySupplierId(supplierId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(supplierId);
        }
        [HttpGet("GetPaymentSettingsBySupplierId")]
        public async Task<IActionResult> GetPaymentSettingsBySupplierId(int supplierId)
        {
            if (supplierId > 0)
            {
                GetPaymentSettingsBySupplierIdResponse responseData = await _serviceManager.supplierFinancialSettingsService.GetPaymentSettingsBySupplierId(supplierId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(supplierId);
        }

        //[HttpGet("GetSupplierFinancialSettingsWithACHWireBySupplierId")]
        //public async Task<IActionResult> GetSupplierFinancialSettingsWithACHWireBySupplierId(int supplierId)
        //{
        //    if (supplierId > 0)
        //    {
        //        GetSupplierFinancialSettingsWithACHWireBySupplierIdResponse responseData = await _serviceManager.supplierFinancialSettingsService.GetSupplierFinancialSettingsWithACHWireBySupplierId(supplierId).ConfigureAwait(true);
        //        return APISucessResponce(responseData);
        //    }
        //    return APISucessResponce(supplierId);
        //}
        #endregion

    }
}
