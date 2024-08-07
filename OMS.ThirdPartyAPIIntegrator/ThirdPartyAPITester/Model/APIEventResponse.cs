namespace ThirdPartyAPILibrary.Model
{
    public class APIEventResponse
    {
        public int? ProviderId { get; set; }
        public string? ProviderName { get; set; }
        public string? BaseURL { get; set; }
        public string? IssuerURL { get; set; }
        public string? AuthenticationType { get; set; }
        public string? AuthKey { get; set; }
        public string? ClientId { get; set; }
        public string? ClientSecret { get; set; }
        public string? Token { get; set; }
        public DateTime TokenExpiryTime { get; set; }
        public DateTime TokenExpireDate { get; set; }
        public string? EndPointName { get; set; }
        public string? Path { get; set; }
        public string? Method { get; set; }
        public string Parameters { get; set; }
        public string? DataType { get; set; }
        public string? DefaultValue { get; set; }
        public bool? IsRequired { get; set; }
        public int AuthId { get; set; }
    }
}
