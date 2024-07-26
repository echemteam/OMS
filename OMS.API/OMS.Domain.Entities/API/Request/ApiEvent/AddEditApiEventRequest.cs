namespace OMS.Domain.Entities.API.Request.ApiEvent
{
    public class AddEditApiEventRequest
    {
        public int? ApiEventId { get; set; }
        public string? EventName { get; set; }
        public string? Description { get; set; }
    }
}
