using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        [HttpPost("AddCustomersBasicInformation")]
        public async Task<IActionResult> AddCustomersBasicInformation(AddCustomersBasicInformationRequest requestData)
        {
            var addItem = await _serviceManager.customersServices.AddCustomersBasicInformation(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("UpdateCustomersBasicInformation")]
        public async Task<IActionResult> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData)
        {
            AddEntityDTO<int> responseData = new();
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
            var updateItem = await _serviceManager.customersServices.UpdateCustomerApproveStatus(requestData);
            return APISucessResponce(updateItem);
        }
        #endregion
    }
}
