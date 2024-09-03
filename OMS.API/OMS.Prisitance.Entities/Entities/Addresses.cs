using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("Addresses")]
    public class Addresses
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int? AddressId { get; set; }
        [Column("Name")]
        public string? Name { get; set; }
        [Column("Title")]
        public string? Title { get; set; }

        [Column("AddressLine1")]
        public string? AddressLine1 { get; set; }
        [Column("AddressLine2")]
        public string? AddressLine2 { get; set; }

        [Column("AddressLine3")]
        public string? AddressLine3 { get; set; }
        [Column("AddressLine4")]
        public string? AddressLine4 { get; set; }
        [Column("AddressLine5")]
        public string? AddressLine5 { get; set; }
        [Column("CityId")]
        public int? CityId { get; set; }
        [Column("StateId")]
        public int? StateId { get; set; }
        [Column("CountryId")]
        public short? CountryId { get; set; }
        [Column("ZipCode")]
        public string? ZipCode { get; set; }
        [Column("IsVerified")]
        public bool? IsVerified { get; set; }
        [Column("VerifiedBy")]
        public short? VerifiedBy { get; set; }
        [Column("Notes")]
        public string? Notes { get; set; }
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
