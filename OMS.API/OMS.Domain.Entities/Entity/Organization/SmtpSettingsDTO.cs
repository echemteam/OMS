using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.Organization
{
    public class SmtpSettingsDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("SmtpSettingId")]
        public short? SmtpSettingId { get; set; }
        [Column("EmailProvider")]
        public string? EmailProvider { get; set; }
        [Column("SmtpServer")]
        public string? SmtpServer { get; set; }
        [Column("SmtpPort")]
        public int? SmtpPort { get; set; }
        [Column("SmtpUserName")]
        public string? SmtpUserName { get; set; }
        [Column("SmtpPassword")]
        public string? SmtpPassword { get; set; }
        [Column("UseSsl")]
        public bool? UseSsl { get; set; }
        [Column("CreatedAt")]
        public DateTime? CreatedAt { get; set; }
        [Column("CreatedBy")]
        public short? CreatedBy { get; set; }
        [Column("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }
        [Column("UpdatedBy")]
        public short? UpdatedBy { get; set; }
        [Column("DeletedAt")]
        public DateTime? DeletedAt { get; set; }
        [Column("DeletedBy")]
        public short? DeletedBy { get; set; }
    }
}
