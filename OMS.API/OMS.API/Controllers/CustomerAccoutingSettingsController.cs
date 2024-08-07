using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
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


        [HttpPost("AddCustomerShppingDeliveryCarriersAndDeliveryMethods")]
        public async Task<IActionResult> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(AddCustomerShppingDeliveryCarriersAndDeliveryMethodsRequest requestData)
        {
            var addItem = await _serviceManager.customerAccoutingSettingsService.AddCustomerShppingDeliveryCarriersAndDeliveryMethods(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("UpdateShppingDeliveryCarriers")]
        public async Task<IActionResult> UpdateShppingDeliveryCarriers(UpdateShppingDeliveryCarriersRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.customerAccoutingSettingsService.UpdateShppingDeliveryCarriers(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
        }

        [HttpGet("GetShppingDeliveryCarrierAndDeliveryMethodsById")]
        public async Task<IActionResult> GetShppingDeliveryCarrierAndDeliveryMethodsById(int customerId)
        {
            if (customerId > 0)
            {
                var shppingDetails = await _serviceManager.customerAccoutingSettingsService.GetShppingDeliveryCarrierAndDeliveryMethodsById(customerId).ConfigureAwait(true);
                return APISucessResponce<object>(shppingDetails);
            }
            return APISucessResponce(customerId);
        }

        [HttpPost("UpdateDeliveryMethods")]
        public async Task<IActionResult> UpdateDeliveryMethods(UpdateDeliveryMethodsRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.customerAccoutingSettingsService.UpdateDeliveryMethods(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
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

        [HttpPost("AddShppingDeliveryCarriers")]
        public async Task<IActionResult> AddShppingDeliveryCarriers(AddShppingDeliveryCarriersRequest requestData)
        {
            var addiItem = await _serviceManager.customerAccoutingSettingsService.AddShppingDeliveryCarriers(requestData, CurrentUserId);
            return APISucessResponce(addiItem);
        }

        [HttpPost("AddDeliveryMethods")]
        public async Task<IActionResult> AddDeliveryMethods(AddDeliveryMethodsRequest requestData)
        {
            var addiItem = await _serviceManager.customerAccoutingSettingsService.AddDeliveryMethods(requestData, CurrentUserId);
            return APISucessResponce(addiItem);
        }


        [HttpGet("GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId")]
        public async Task<IActionResult> GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId(int customerDeliveryCarrierId)
        {
            if (customerDeliveryCarrierId > 0)
            {
                GetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse responseData = await _serviceManager.customerAccoutingSettingsService.GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId(customerDeliveryCarrierId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(customerDeliveryCarrierId);
        }

        [HttpGet("GetCustomerDeliveryMethodByCustomerDeliveryMethodId")]
        public async Task<IActionResult> GetCustomerDeliveryMethodByCustomerDeliveryMethodId(int customerDeliveryMethodId)
        {
            if (customerDeliveryMethodId > 0)
            {
                GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse responseData = await _serviceManager.customerAccoutingSettingsService.GetCustomerDeliveryMethodByCustomerDeliveryMethodId(customerDeliveryMethodId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(customerDeliveryMethodId);
        }
        #endregion
    }
}



