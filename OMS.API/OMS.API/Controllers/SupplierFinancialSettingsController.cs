using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.SupplierAccoutingSetting;
using OMS.Domain.Entities.API.Request.supplierPaymentSettings;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        #endregion

    }
}
