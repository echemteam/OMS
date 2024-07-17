namespace OMS.Domain.Entities.API.Response.ApiEndpoint
{
    public class GetApiEndpointByEndpointIdResponse
    {
        public int? EndpointId { get; set; }
        public string? EndpointName { get; set; }
        public int? ProviderId { get; set; }
        public string? Name { get; set; }
        public string? Path { get; set; }
        public string? Method { get; set; }
        public string? Description { get; set; }
    }
}
