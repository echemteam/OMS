﻿using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Order
{
    public interface IOrderServices
    {
        Task<AddEntityDto<int>> CheckPoNumberExistOrNot(CheckPoNumberExistOrNotRequest requestData);
        Task<List<GetPoNumberDetailsByPoNumberResponse>> GetPoNumberDetailsByPoNumber(string poNumber);
        Task<AddEntityDto<int>> AddOrder(AddOrderRequest requestData, short CurrentUserId);
        Task<EntityList<GetOrderResponse>> GetOrders(GetOrderRequest request);
        Task<GetOrderDetailByOrderIdResponse> GetOrderDetailByOrderId(int orderId);
    }
}
