using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiAuthentication
{
    public class GetApiAuthenticationsRequest : ListEntityRequest<BaseFilter>
    {
        public int? ProviderId { get; set; }
    }
}
