﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{

    [Table("SmtpSettings")]
    public class SmtpSettings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("SmtpSettingId")]
        public short? SmtpSettingId { get; set; }
        [Column("OrganizationId")]
        public byte? OrganizationId { get; set; }
        [Column("EmailProvider")]
        public string? EmailProvider { get; set; }
        [Column("SmtpServer")]
        public string? SmtpServer { get; set; }
        [Column("SmtpUserName")]
        public int? SmtpPort { get; }
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
