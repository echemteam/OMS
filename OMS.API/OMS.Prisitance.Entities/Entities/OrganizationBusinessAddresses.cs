using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("OrganizationBusinessAddresses")]
    public class OrganizationBusinessAddresses
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte? OrganizationBusinessAddressId { get; set; }
        [Column("RegisteredAddressId")]
        public int? RegisteredAddressId { get; set; }
        [Column("PhysicalAddressId")]
        public int? PhysicalAddressId { get; set; }
        [Column("RemitToAddressId")]
        public int? RemitToAddressId { get; set; }
        [Column("BillToAddressId")]
        public int? BillToAddressId { get; set; }
        [Column("LabAddressId")]
        public int? LabAddressId { get; set; }
        [Column("WarehouseAddressId")]
        public int? WarehouseAddressId { get; set; }
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
