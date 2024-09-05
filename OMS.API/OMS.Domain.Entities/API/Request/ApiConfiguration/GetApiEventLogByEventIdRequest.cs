using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiConfiguration
{
    public class GetApiEventLogByEventIdRequest : ListEntityRequest<BaseFilter>
    {
        public int? EventId { get; set; }
    }
}
