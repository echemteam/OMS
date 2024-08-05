namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationHistorysResponse
    {
        public int? OrganizationHistoryId { get; set; }
        public string? EventName { get; set; }
        public short? ChangeBy { get; set; }
        public DateTime? ChangeAt { get; set; }
        public string? Description { get; set; }
        public string? EventStatus { get; set; }
    }
}
