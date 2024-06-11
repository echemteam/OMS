﻿using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("UpdateAddAddress")]
        public async Task<IActionResult> UpdateAddAddress(UpdateAddressRequest requestData)
        {
            AddEntityDTO<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.addressServices.UpdateAddAddress(requestData, CurrentUserId);
                return APISucessResponce(requestData);
            }
            return APISucessResponce(requestData);
        }
        #endregion
    }
}
