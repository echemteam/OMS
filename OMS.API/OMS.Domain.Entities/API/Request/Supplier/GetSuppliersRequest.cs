using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class GetSuppliersRequest : ListEntityRequest<BaseFilter>
    {
        public string? StatusId { get; set; }
    }
}
