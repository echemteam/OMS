using OMS.Domain.Entities.API.Request.OrderAddress;
using OMS.Domain.Entities.API.Request.OrderContact;
using OMS.Domain.Entities.API.Request.OrderItem;
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
        Task<GetOrderItemsByOrderIdResponse> GetOrderItemsByOrderId(int orderId);
        Task<GetOrderDetailByOrderIdResponse> GetOrderDetailByOrderId(int orderId);
        Task<AddEntityDto<int>> DeleteOrder(int orderId, int deletedBy);
        Task<AddEntityDto<int>> AddOrderDocuments(AddOrderDocumentsRequest requestData, short CurrentUserId);
        Task<GetOrderItemByOrderItemIdResponse> GetOrderItemByOrderItemId(long orderItemId);
        Task<AddEntityDto<long>> UpdateOrderItemByOrderItemId(UpdateOrderItemByOrderItemIdRequest updateOrderItemRequest, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateOrderAddress(UpdateOrderAddressRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> DeleteOrderDocuementById(int OrderDocumentId, int deletedBy);
        Task<AddEntityDto<int>> UpdateOrderContact(UpdateOrderContactRequest requestData, short CurrentUserId);

        Task<AddEntityDto<int>> UpdateOrderDetail(UpdateOrderDetailRequest requestData, short CurrentUserId);
        Task<AddEntityDto<long>> DeleteOrderItems(long orderItemId, int deletedBy);
        Task<List<GetOrderHistoryByOrderIdResponse>> GetOrderHistoryByOrderId(int orderId);


    }
}
