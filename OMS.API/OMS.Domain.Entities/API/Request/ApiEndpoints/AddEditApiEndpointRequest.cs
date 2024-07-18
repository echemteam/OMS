namespace OMS.Domain.Entities.API.Request.ApiEndpoints
{
    public class AddEditApiEndpointRequest
    {
        public int? EndpointId { get; set; }
        public int? ProviderId { get; set; }
        public string? Name { get; set; }
        public string? Path { get; set; }
        public string? Method { get; set; }
        public string? Description { get; set; }
    }
}
