using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerAccoutingSettingsController : BaseController
    {
        #region Private Variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public CustomerAccoutingSettingsController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region API
        [HttpGet("GetDetailsbyCustomerID")]
        public async Task<IActionResult> GetDetailsbyCustomerID(int customerId)
        {
            if (customerId > 0)
            {
                var customerDetails = await _serviceManager.customerAccoutingSettingsService.GetDetailsbyCustomerID(customerId).ConfigureAwait(true);
                return APISucessResponce<object>(customerDetails);
            }
            return APISucessResponce(customerId);
        }

        [HttpPost("AddEditCustomerSettings")]
        public async Task<IActionResult> AddEditCustomerSettings(AddEditCustomerSettingRequest requestData)
        {
            var addEditSetting = await _serviceManager.customerAccoutingSettingsService.AddEditCustomerSettings(requestData, CurrentUserId);
            return APISucessResponce(addEditSetting);
        }

        [HttpDelete("DeleteCustomerDeliveryCarriersById")]
        public async Task<IActionResult> DeleteCustomerDeliveryCarriersById(int CustomerDeliveryCarrierId)
        {
            if (CustomerDeliveryCarrierId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.customerAccoutingSettingsService.DeleteCustomerDeliveryCarriersById(CustomerDeliveryCarrierId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(CustomerDeliveryCarrierId);
        }

        [HttpDelete("DeleteCustomerDeliveryMethodsById")]
        public async Task<IActionResult> DeleteCustomerDeliveryMethodsById(int CustomerDeliveryMethodId)
        {
            if (CustomerDeliveryMethodId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.customerAccoutingSettingsService.DeleteCustomerDeliveryMethodsById(CustomerDeliveryMethodId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(CustomerDeliveryMethodId);
        }









        #endregion
    }
}
