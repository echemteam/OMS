namespace OMS.Domain.Entities.API.Request.ApiConfiguration
{
    public class AddEditApiProviderRequest
    {
        public int? ProviderId { get; set; }
        public string? Name { get; set; }
        public string? BaseURL { get; set; }
        public string? AuthenticationType { get; set; }
    }
}
