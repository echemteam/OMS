using OMS.Domain.Entities.Entity.CommonEntity;
namespace OMS.Domain.Entities.API.Request.ApiEventMapping
{
    public class GetApiEventMappingsRequest : ListEntityRequest<BaseFilter>
    {
        public int? ApiEventId { get; set; }
    }
}
