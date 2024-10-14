using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.Organization
{
    public class GetOrganizationHistoryRequest : ListEntityRequest<BaseFilter>
    {
        public DateTime? ToDate { get; set; }
        public DateTime? FromDate { get; set; }
        public string? EventName { get; set; }
    }
}
