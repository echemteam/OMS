namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditSmtpSettingsRequest
    {
        public short? SmtpSettingId { get; set; }
        public byte? OrganizationId { get; set; }
        public string? EmailProvider { get; set; }
        public string? SmtpServer { get; set; }
        public int? SmtpPort { get; set; }
        public string? SmtpUserName { get; set; }
        public string? SmtpPassword { get; set; }
        public bool? UseSsl { get; set; }
    }
}
