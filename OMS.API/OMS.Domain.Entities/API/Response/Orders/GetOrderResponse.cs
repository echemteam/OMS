﻿namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetOrderResponse
    {
        public List<OrderListResponse>? OrderList { get; set; }
        public List<OrderItemResponse>? OrderItemList { get; set; }
        public int TotalRecord { get; set; }
    }
}
