using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiParameterMapping
{
    public class GetApiParameterMappingsRequest : ListEntityRequest<BaseFilter>
    {
        public int? ApiEventId { get; set; }
    }
}
