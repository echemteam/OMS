using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Orders;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrderRepository
    {
        Task<AddEntityDto<int>> CheckPoNumberExistOrNot(OrderDto requestData);
        Task<List<GetPoNumberDetailsByPoNumberResponse>> GetPoNumberDetailsByPoNumber(string poNumber);
    }
}
