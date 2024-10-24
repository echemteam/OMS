﻿using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
    public class CustomersController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public CustomersController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Customers API
        [HttpPost("AddEditCustomersBasicInformation")]
        public async Task<IActionResult> AddEditCustomersBasicInformation(AddEditCustomersBasicInformationRequest requestData)
        {
            var addEditItem = await _serviceManager.customersServices.AddEditCustomersBasicInformation(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }

        [HttpPost("UpdateCustomersBasicInformation")]
        public async Task<IActionResult> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.customersServices.UpdateCustomersBasicInformation(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }

        [HttpGet("GetCustomersBasicInformationById")]
        public async Task<IActionResult> GetCustomersBasicInformationById(int customerId)
        {
            if (customerId > 0)
            {
                var customerDetails = await _serviceManager.customersServices.GetCustomersBasicInformationById(customerId).ConfigureAwait(true);
                return APISucessResponce<object>(customerDetails);
            }
            return APISucessResponce(customerId);
        }
        [HttpPost("GetCustomers")]
        public async Task<IActionResult> GetCustomers(GetCustomersRequest queryRequest)
        {
            var customers = await _serviceManager.customersServices.GetCustomers(queryRequest);
            return APISucessResponce<object>(customers);
        }

        [HttpPost("CheckCustomerNameExist")]
        public async Task<IActionResult> CheckCustomerNameExist(CheckCustomerNameExistRequest requestData)
        {
            var checkItem = await _serviceManager.customersServices.CheckCustomerNameExist(requestData);
            return APISucessResponce(checkItem);
        }

        [HttpPost("UpdateCustomerApproveStatus")]
        public async Task<IActionResult> UpdateCustomerApproveStatus(UpdateCustomerApproveStatusRequest requestData)
        {
            var updateItem = await _serviceManager.customersServices.UpdateCustomerApproveStatus(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }

        [HttpPost("UpdateCustomerInActiveStatus")]
        public async Task<IActionResult> UpdateCustomerInActiveStatus(UpdateCustomerInActiveStatusRequest requestData)
        {
            var updateItem = await _serviceManager.customersServices.UpdateCustomerInActiveStatus(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }

        [HttpPost("UpdateCustomerStatus")]
        public async Task<IActionResult> UpdateCustomerStatus(UpdateCustomerStatusRequest requestData)
        {
            var updateItem = await _serviceManager.customersServices.UpdateCustomerStatus(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }

        [HttpPost("GetCustomerAuditHistoryByCustomerId")]
        public async Task<IActionResult> GetCustomerAuditHistoryByCustomerId(GetCustomerAuditHistoryByCustomerIdRequest queryRequest)
        {
            var customersAuditHistory = await _serviceManager.customersServices.GetCustomerAuditHistoryByCustomerId(queryRequest);
            return APISucessResponce<object>(customersAuditHistory);
        }

        [HttpGet("GetCustomersDetailsByCutomerName")]
        public async Task<IActionResult> GetCustomersDetailsByCutomerName(string customerName)
        {
            if (customerName != null)
            {
                List<GetCustomersDetailsByCutomerNameResponse> responseData = await _serviceManager.customersServices.GetCustomersDetailsByCutomerName(customerName).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(customerName);
        }

        [HttpPost("UpdateCustomerSubCustomer")]
        public async Task<IActionResult> UpdateCustomerSubCustomer(UpdateCustomerSubCustomerRequest requestData)
        {
            var responseData = await _serviceManager.customersServices.UpdateCustomerSubCustomer(requestData).ConfigureAwait(true);
            return APISucessResponce<object>(responseData);
        }
        [HttpPost("AddSubCustomer")]
        public async Task<IActionResult> AddSubCustomer(AddSubCustomerRequest requestData)
        {
            var addEditItem = await _serviceManager.customersServices.AddSubCustomer(requestData);
            return APISucessResponce(addEditItem);
        }
        [HttpPost("GetSubCustomerByCustomerId")]
        public async Task<IActionResult> GetSubCustomerByCustomerId(GetSubCustomerByCustomerIdRequest requestData)
        {
            var subCustomerDetails = await _serviceManager.customersServices.GetSubCustomerByCustomerId(requestData).ConfigureAwait(true);
            return APISucessResponce<object>(subCustomerDetails);
        }
        [HttpDelete("DeleteSubCustomer")]
        public async Task<IActionResult> DeleteSubCustomer(int subCustomerMainCustomerId)
        {
            if (subCustomerMainCustomerId > 0)
            {
                var deleteItem = await _serviceManager.customersServices.DeleteSubCustomer(subCustomerMainCustomerId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(subCustomerMainCustomerId);
        }
        [HttpPost("AddEditResponsibleUserForCustomer")]
        public async Task<IActionResult> AddEditResponsibleUserForCustomer(AddEditResponsibleUserForCustomerRequest requestData)
        {
            var updateItem = await _serviceManager.customersServices.AddEditResponsibleUserForCustomer(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }

        [HttpPost("GetSearchCustomersDetailsByNameEmailWebsite")]
        public async Task<IActionResult> GetSearchCustomersDetailsByNameEmailWebsite(GetSearchCustomersDetailsByNameEmailWebsiteRequest requestData)
        {
            if (requestData != null)
            {
                List<GetSearchCustomersDetailsByNameEmailWebsiteResponse> responseData = await _serviceManager.customersServices.GetSearchCustomersDetailsByNameEmailWebsite(requestData).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(requestData);
        }
        #endregion
    }
}
