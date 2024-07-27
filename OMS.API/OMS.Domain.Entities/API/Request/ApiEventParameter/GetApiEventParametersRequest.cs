using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiEventParameter
{
    public class GetApiEventParametersRequest : ListEntityRequest<BaseFilter>
    {
        public int? ApiEventId { get; set; }
    }
}
