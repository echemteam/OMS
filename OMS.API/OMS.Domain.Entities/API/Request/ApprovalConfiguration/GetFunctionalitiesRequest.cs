using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApprovalConfiguration
{
    public class GetFunctionalitiesRequest : ListEntityRequest<BaseFilter>
    {
        public int? ModuleId { get; set; }
    }
}
