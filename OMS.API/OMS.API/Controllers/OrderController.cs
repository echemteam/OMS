using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
    public class OrderController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public OrderController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Order API
        [HttpPost("CheckPoNumberExistOrNot")]
        public async Task<IActionResult> CheckPoNumberExistOrNot(CheckPoNumberExistOrNotRequest requestData)
        {
            var checkItem = await _serviceManager.orderServices.CheckPoNumberExistOrNot(requestData);
            return APISucessResponce(checkItem);
        }
        [HttpGet("GetPoNumberDetailsByPoNumber")]
        public async Task<IActionResult> GetPoNumberDetailsByPoNumber(string poNumber)
        {
            if (poNumber != null)
            {
                List<GetPoNumberDetailsByPoNumberResponse> responseData = await _serviceManager.orderServices.GetPoNumberDetailsByPoNumber(poNumber).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(poNumber);
        }
        [HttpPost("AddEditOrderInformation")]
        public async Task<IActionResult> AddEditOrderInformation(AddEditOrderInformationRequest requestData)
        {
            var addEditItem = await _serviceManager.orderServices.AddEditOrderInformation(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpPost("AddEditOrderContactInformation")]
        public async Task<IActionResult> AddEditOrderContactInformation(AddEditOrderContactInformationRequest requestData)
        {
            var addEditItem = await _serviceManager.orderServices.AddEditOrderContactInformation(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        #endregion
    }
}
