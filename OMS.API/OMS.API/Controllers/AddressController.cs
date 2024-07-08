using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AddressController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public AddressController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Address API

        [HttpPost("AddAddress")]
        public async Task<IActionResult> AddAddress(AddAddressRequest requestData)
        {
            var addItem = await _serviceManager.addressServices.AddAddress(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpGet("GetAddresssByCustomerId")]
        public async Task<IActionResult> GetAddresssByCustomerId(int customerId)
        {
            List<GetAddresssByCustomerIdResponse> responseData = await _serviceManager.addressServices.GetAddresssByCustomerId(customerId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }


        [HttpGet("GetCustomerAddresssByAddressId")]
        public async Task<IActionResult> GetCustomerAddresssByAddressId(int addressId)
        {
            if (addressId > 0)
            {
                GetCustomerAddresssByAddressIdResponse responseData = await _serviceManager.addressServices.GetCustomerAddresssByAddressId(addressId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(addressId);
        }

        [HttpPost("UpdateAddAddress")]
        public async Task<IActionResult> UpdateAddAddress(UpdateAddressRequest requestData)
        {
            AddEntityDTO<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.addressServices.UpdateAddAddress(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAddresssBySupplierId")]
        public async Task<IActionResult> GetAddresssBySupplierId(int supplierId)
        {
            List<GetAddresssBySupplierIdResponse> responseData = await _serviceManager.addressServices.GetAddresssBySupplierId(supplierId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetSupplierAddresssByAddressId")]
        public async Task<IActionResult> GetSupplierAddresssByAddressId(int addressId)
        {
            if (addressId > 0)
            {
                GetSupplierAddresssByAddressIdResponse responseData = await _serviceManager.addressServices.GetSupplierAddresssByAddressId(addressId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(addressId);
        }
        #endregion
    }
}
