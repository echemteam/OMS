using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Orders;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrderRepository
    {
        Task<AddEntityDto<int>> CheckPoNumberExistOrNot(OrderDto requestData);
        Task<List<GetPoNumberDetailsByPoNumberResponse>> GetPoNumberDetailsByPoNumber(string poNumber);
        Task<AddEntityDto<int>> AddOrder(OrderDto requestData);
        Task<EntityList<GetOrderResponse>> GetOrders(GetOrderRequest request);
        Task<GetOrderDetailByOrderIdResponse> GetOrderDetailByOrderId(int orderId);
        Task<AddressResponse> GetOrderAddressesByOrderId(int addressId);
    }
}
