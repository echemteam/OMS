using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderItems;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrderItemRepository
    {
        Task<AddEntityDto<int>> AddOrderItem(OrderItemsDto requestData);
    }
}
