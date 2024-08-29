using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderAddress;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrderAddressRepository
    {
        Task<AddEntityDto<int>> AddOrderAddress(OrderAddressDto requestData);
    }
}
