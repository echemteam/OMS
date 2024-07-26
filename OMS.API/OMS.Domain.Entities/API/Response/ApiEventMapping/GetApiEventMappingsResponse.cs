namespace OMS.Domain.Entities.API.Response.ApiEventMapping
{
    public class GetApiEventMappingsResponse
    {
        public int? ApiEventMappingId { get; set; }
        public int? ApiEventId { get; set; }
        public string? EventName { get; set; }
        public int? ProviderId { get; set; }
        public string? ProviderName { get; set; }
        public int? EndpointId { get; set; }
        public string? EndpointName { get; set; }
        public string? Description { get; set; }
    }
}
