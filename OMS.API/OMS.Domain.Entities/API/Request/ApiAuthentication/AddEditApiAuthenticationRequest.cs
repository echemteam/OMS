namespace OMS.Domain.Entities.API.Request.ApiAuthentication
{
    public class AddEditApiAuthenticationRequest
    {
        public int? AuthId { get; set; }
        public int? ProviderId { get; set; }
        public string? AuthKey { get; set; }
        public string? ClientId { get; set; }
        public string? ClientSecret { get; set; }
        public string? TokenEndpoint { get; set; }
        public DateTime? TokenExpires { get; set; }
    }
}
