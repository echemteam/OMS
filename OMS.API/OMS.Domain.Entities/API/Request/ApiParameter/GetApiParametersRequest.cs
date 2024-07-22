using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiParameter
{
    public class GetApiParametersRequest : ListEntityRequest<BaseFilter>
    {
        public int? EndpointId { get; set; }
    }
}
