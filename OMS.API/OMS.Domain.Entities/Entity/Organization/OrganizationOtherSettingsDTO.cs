using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationOtherSettingsDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? OrganizationOtherSettingId { get; set; }
        [Column("OrganizationId")]
        public byte? OrganizationId { get; set; }
        [Column("DefaultPaymentTerms")]
        public string? DefaultPaymentTerms { get; set; }
        [Column("FedexAccountDetail")]
        public string? FedexAccountDetail { get; set; }
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
