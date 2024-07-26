using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.ApiEventRequiredFieldsMapping
{
    public class GetApiEventRequiredFieldsMappingsRequest : ListEntityRequest<BaseFilter>
    {
        public int? ApiEventId { get; set; }
    }
}
