namespace OMS.Domain.Entities.API.Request.Organization
{
    public class SmtpCheckConnection
    {
        public string? EmailProvider { get; set; }
        public string? SmtpServer { get; set; }
        public int? SmtpPort { get; set; }
        public string? SmtpUserName { get; set; }
        public string? SmtpPassword { get; set; }
        public bool? UseSsl { get; set; }
        public string? ClientId { get; set; }
        public string? ClientSecret { get; set; }
        public string? TenantId { get; set; }
        public string? EmailTo { get; set; }
        public string? Body { get; set; }
        public string? Subject { get; set; }
    }
}
