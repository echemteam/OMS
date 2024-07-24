using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("SupplierAccoutingSettings")]
    public class SupplierAccoutingSetting
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? SupplierAccountingSettingId { get; set; }
        [Column("PaymentTermId")]
        public byte? PaymentTermId { get; set; }
        [Column("SupplierId")]
        public int? SupplierId { get; set; }
        [Column("InvoiceSubmissionMethod")]
        public string? InvoiceSubmissionMethod { get; set; }
        [Column("PoDeliveryMethodId")]
        public byte? PoDeliveryMethodId { get; set; }
        [Column("IsActive")]
        public bool? IsActive { get; set; }
        [Column("PODeliveryMethodDetail")]
        public string? PODeliveryMethodDetail { get; set; }
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
