using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiEventRequiredField
{
    public class GetApiEventRequiredFieldsRequest : ListEntityRequest<BaseFilter>
    {
        public int? ApiEventId { get; set; }
    }
}
