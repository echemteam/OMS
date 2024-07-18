namespace OMS.Domain.Entities.API.Response.ApiAuthentication
{
    public class GetApiAuthenticationByAuthIdResponse
    {
        public int? AuthId { get; set; }
        public int? ProviderId { get; set; }
        public string? ProviderName { get; set; }
        public string? AuthenticationType { get; set; }
        public string? AuthKey { get; set; }
        public string? ClientId { get; set; }
        public string? ClientSecret { get; set; }
        public string? TokenEndpoint { get; set; }
        public DateTime? TokenExpires { get; set; }
    }
}
