using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

            var updateItem = await _serviceManager.customersServices.UpdateCustomersBasicInformation(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }

        [HttpGet("GetCustomersBasicInformationById")]
        public async Task<IActionResult> GetCustomersBasicInformationById(int CustomerId)
        {
            if (CustomerId > 0)
            {
                var customerDetails = await _serviceManager.customersServices.GetCustomersBasicInformationById(CustomerId).ConfigureAwait(true);
                return APISucessResponce<object>(customerDetails);
            }
            return APISucessResponce(CustomerId);
        }
        #endregion
    }
}
