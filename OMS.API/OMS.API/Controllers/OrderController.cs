﻿using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.OrderAddress;
using OMS.Domain.Entities.API.Request.OrderContact;
using OMS.Domain.Entities.API.Request.OrderItem;
using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
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
            if (orderId > 0)
            {
                GetOrderItemsByOrderIdResponse responseData = await _serviceManager.orderServices.GetOrderItemsByOrderId(orderId).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(orderId);
        }

        [HttpGet("GetOrderDetailByOrderId")]
        public async Task<IActionResult> GetOrderDetailByOrderId(int orderId)
        {
            if (orderId > 0)
            {
                GetOrderDetailByOrderIdResponse responseData = await _serviceManager.orderServices.GetOrderDetailByOrderId(orderId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(orderId);
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

        [HttpPost("AddOrderDocuments")]
        public async Task<IActionResult> AddOrderDocuments(AddOrderDocumentsRequest requestData)
        {
            var addItem = await _serviceManager.orderServices.AddOrderDocuments(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpGet("GetOrderItemByOrderItemId")]
        public async Task<IActionResult> GetOrderItemByOrderItemId(long orderItemId)
        {
            GetOrderItemByOrderItemIdResponse responseData = await _serviceManager.orderServices.GetOrderItemByOrderItemId(orderItemId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpPost("UpdateOrderItemByOrderItemId")]
        public async Task<IActionResult> UpdateOrderItemByOrderItemId(UpdateOrderItemByOrderItemIdRequest requestData)
        {
            AddEntityDto<long> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.orderServices.UpdateOrderItemByOrderItemId(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
        }
        [HttpPost("UpdateOrderAddress")]
        public async Task<IActionResult> UpdateOrderAddress(UpdateOrderAddressRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.orderServices.UpdateOrderAddress(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }

        [HttpDelete("DeleteOrderDocuementById")]
        public async Task<IActionResult> DeleteOrderDocuementById(int OrderDocumentId)
        {
            if (OrderDocumentId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.orderServices.DeleteOrderDocuementById(OrderDocumentId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(OrderDocumentId);
        }
        [HttpPost("UpdateOrderContact")]
        public async Task<IActionResult> UpdateOrderContact(UpdateOrderContactRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.orderServices.UpdateOrderContact(requestData,CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }
        [HttpPost("UpdateOrderDetail")]
        public async Task<IActionResult> UpdateOrderDetail(UpdateOrderDetailRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.orderServices.UpdateOrderDetail(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(responseData);
        }
        [HttpDelete("DeleteOrderItems")]
        public async Task<IActionResult> DeleteOrderItems(long orderItemId)
        {
            if (orderItemId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.orderServices.DeleteOrderItems(orderItemId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(orderItemId);
        }
        [HttpGet("GetOrderHistoryByOrderId")]
        public async Task<IActionResult> GetOrderHistoryByOrderId(int orderId)
        {
            List<GetOrderHistoryByOrderIdResponse> responseData = await _serviceManager.orderServices.GetOrderHistoryByOrderId(orderId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        #endregion
    }
}
