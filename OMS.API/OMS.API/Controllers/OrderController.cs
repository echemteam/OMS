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
    //[CheckClientIpActionFilter]
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
        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder(AddOrderRequest requestData)
        {
            var addItem = await _serviceManager.orderServices.AddOrder(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("GetOrders")]
        public async Task<IActionResult> GetOrders(GetOrderRequest request)
        {   
            var list = await _serviceManager.orderServices.GetOrders(request);
            return APISucessResponce<object>(list);
        }
        [HttpGet("GetOrderItemsByOrderId")]
        public async Task<IActionResult> GetOrderItemsByOrderId(int orderId)
        {
            if (orderId != null)
            {
                List<GetOrderItemsByOrderIdResponse> responseData = await _serviceManager.orderServices.GetOrderItemsByOrderId(orderId).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(orderId);
        }
        [HttpGet("GetOrderDetailByOrderId")]
        public async Task<IActionResult> GetOrderDetailByOrderId(int orderId)
        {
            GetOrderDetailByOrderIdResponse responseData = await _serviceManager.orderServices.GetOrderDetailByOrderId(orderId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        [HttpDelete("DeleteOrder")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            if (orderId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.orderServices.DeleteOrder(orderId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(orderId);
        }
        #endregion
    }
}
