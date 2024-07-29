namespace OMS.Domain.Entities.API.Request.ApiEventMapping
{
    public class AddApiEventMappingRequest
    {
        public int? ApiEventId { get; set; }
        public int? ProviderId { get; set; }
        public int? EndpointId { get; set; }
        public string? Description { get; set; }
    }
}
