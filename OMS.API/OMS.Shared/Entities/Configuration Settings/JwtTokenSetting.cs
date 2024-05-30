namespace OMS.Shared.Entities.Configuration_Settings
{
    public class JwtTokenSetting
    {
        public string? Secret { get; set; }
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
    }
}
