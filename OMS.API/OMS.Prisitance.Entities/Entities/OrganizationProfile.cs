using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{

    [Table("OrganizationProfile")]
    public class OrganizationProfile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte? OrganizationProfileId { get; set; }
        [Column("RegisteredName")]
        public string? RegisteredName { get; set; }
        [Column("DBAName")]
        public string? DBAName { get; set; }
        [Column("DateIncorporated")]
        public DateTime? DateIncorporated { get; set; }
        [Column("NAICSCode")]
        public string? NAICSCode { get; set; }
        [Column("EIN")]
        public string? EIN { get; set; }
        [Column("TXTaxpayerNumber")]
        public string? TXTaxpayerNumber { get; set; }
        [Column("SOSFileNumber")]
        public string? SOSFileNumber { get; set; }
        [Column("WebFileNumber")]
        public string? WebFileNumber { get; set; }
        [Column("TWCTaxAccountNumber")]
        public string? TWCTaxAccountNumber { get; set; }
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
