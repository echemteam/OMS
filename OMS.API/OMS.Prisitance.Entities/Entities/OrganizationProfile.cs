using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{

    [Table("OrganizationProfile")]
    public class OrganizationProfile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte? OrganizationId { get; set; }
        [Column("Name")]
        public string? Name { get; set; }
        [Column("Logo")]
        public string? Logo { get; set; }
        [Column("Base64File")]
        public string? Base64File { get; set; }
        [Column("AddressLine1")]
        public string? AddressLine1 { get; set; }
        [Column("AddressLine2")]
        public string? AddressLine2 { get; set; }
        [Column("CityId")]
        public int? CityId { get; set; }
        [Column("StateId")]
        public int? StateId { get; set; }
        [Column("CountryId")]
        public short? CountryId { get; set; }
        [Column("ZipCode")]
        public int? ZipCode { get; set; }
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
