﻿using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderDocument;
using OMS.Domain.Entities.Entity.OrderItems;
using OMS.Domain.Entities.Entity.Orders;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrderRepository
    {
        Task<AddEntityDto<int>> CheckPoNumberExistOrNot(OrderDto requestData);
        Task<List<GetPoNumberDetailsByPoNumberResponse>> GetPoNumberDetailsByPoNumber(string poNumber);
        Task<AddEntityDto<int>> AddOrder(OrderDto requestData);
        Task<EntityList<OrderListResponse>> GetOrders(GetOrderRequest request);
        Task<List<OrderItemResponse>> GetOrderItemsByOrderId(int orderId);
        Task<GetOrderDetailByOrderIdResponse> GetOrderDetailByOrderId(int orderId);
        Task<AddressResponse> GetOrderAddressesByOrderId(int addressId);
        Task<AddressResponse> GetOrderItemAddressesByOrderItemId(long orderItemId);
        Task<OrderNotesResponse> GetOrderItemNotesByOrderItemId(long orderItemId);
        Task<List<GetOrderContactByOrderIdResponse>> GetOrderContactByOrderId(int orderId);
        Task<List<GetOrderDocumentByOrderIdResponse>> GetOrderDocumentByOrderId(int orderId);
        Task<AddEntityDto<int>> DeleteOrder(int orderId, int deletedBy);
        Task<AddEntityDto<int>> AddOrderDocuments(OrderDocumentDto orderDocumentsDto, DataTable documentDataTable);
        Task<GetOrderItemByOrderItemIdResponse> GetOrderItemByOrderItemId(long orderItemId);
        Task<AddEntityDto<long>> UpdateOrderItemByOrderItemId(OrderItemsDto orderItemsDto);
        Task<AddEntityDto<int>> DeleteOrderDocuementById(int OrderDocumentId, int deletedBy);
        Task<AddEntityDto<int>> UpdateOrderDetail(OrderDto requestData);
        Task<AddEntityDto<long>> DeleteOrderItems(long orderItemId, int deletedBy);
        Task<List<GetOrderHistoryByOrderIdResponse>> GetOrderHistoryByOrderId(int orderId);

    }
}
