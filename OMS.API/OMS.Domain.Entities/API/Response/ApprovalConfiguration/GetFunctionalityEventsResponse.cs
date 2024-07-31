namespace OMS.Domain.Entities.API.Response.ApprovalConfiguration
{
    public class GetFunctionalityEventsResponse
    {
        public int? FunctionalityEventId { get; set; }
        public string? EventName { get; set; }
        public DateTime? EventDate { get; set; }
        public string? Description { get; set; }
        public int? FunctionalityId { get; set; }
        public string? FunctionalityName { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
