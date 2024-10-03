using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.Orders
{
    public class GetOrderRequest : ListEntityRequest<BaseFilter>
    {
        public byte? OrderStatusId { get; set; }
        public byte? OrderSubStatusId { get; set; }
    }
}
