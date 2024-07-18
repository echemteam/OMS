using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.Customers
{
    public class GetSubCompanysByMainCompanyIdRequest : ListEntityRequest<BaseFilter>
    {
        public int? MainCompanyId { get; set; }
    }
}
