using OMS.Domain.Entities.API.Request.Orders;
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
        Task<GetOrderResponse> GetOrders(GetOrderRequest request);
        Task<List<GetOrderItemsByOrderIdResponse>> GetOrderItemsByOrderId(int orderId);
        Task<GetOrderDetailByOrderIdResponse> GetOrderDetailByOrderId(int orderId);
        Task<AddEntityDto<int>> DeleteOrder(int orderId, int deletedBy);
        Task<AddEntityDto<int>> AddOrderDocuments(AddOrderDocumentsRequest requestData, short CurrentUserId);
        Task<GetOrderItemByOrderItemIdResponse> GetOrderItemByOrderItemId(long orderItemId);
        Task<AddEntityDto<long>> UpdateOrderItemByOrderItemId(UpdateOrderItemByOrderItemIdRequest updateOrderItemRequest, short CurrentUserId);

    }
}
