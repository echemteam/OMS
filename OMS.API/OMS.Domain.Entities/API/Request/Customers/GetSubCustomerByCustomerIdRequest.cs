using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.Customers
{
    public class GetSubCustomerByCustomerIdRequest : ListEntityRequest<BaseFilter>
    {
        public int? CustomerId { get; set; }
    }
}
