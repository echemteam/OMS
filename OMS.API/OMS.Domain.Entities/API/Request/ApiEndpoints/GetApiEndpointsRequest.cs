using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiEndpoints
{
    public class GetApiEndpointsRequest : ListEntityRequest<BaseFilter>
    {
        public int? ProviderId { get; set; }
    }
}
