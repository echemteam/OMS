using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetSmtpSettingsResponse
    {
        public short? SmtpSettingId { get; set; }
        public byte? OrganizationId { get; set; }
        public string? Name { get; set; }
        public string? EmailProvider { get; set; }
        public string? SmtpServer { get; set; }
        public int? SmtpPort { get; }
        public string? SmtpUserName { get; set; }
        public string? SmtpPassword { get; set; }
        public bool? UseSsl { get; set; }
    }
}
