using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApprovalConfiguration
{
    public class GetFunctionalityEventsRequest : ListEntityRequest<BaseFilter>
    {
        public int? FunctionalityId { get; set; }
    }
}
