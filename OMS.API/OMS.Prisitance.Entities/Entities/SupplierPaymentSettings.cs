using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("SupplierPaymentSettings")]
    public class SupplierPaymentSettings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? SupplierPaymentSettingId { get; set; }
        public int? SupplierId { get; set; }
        public string? CCNote { get; set; }
        public bool? IsCCExistsOnFile { get; set; }
        public int? CheckMailingAddressId { get; set; }
        public string? OtherNote { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
