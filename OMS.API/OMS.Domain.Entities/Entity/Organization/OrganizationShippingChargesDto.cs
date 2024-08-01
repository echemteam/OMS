namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationShippingChargesDto
    {
        public byte? OrganizationShippingChargeId { get; set; }
        public decimal? DomesticOvernight { get; set; }
        public decimal? DomesticSecondDay { get; set; }
        public decimal? DomesticGround { get; set; }
        public decimal? InternationalPriority { get; set; }
        public decimal? InternationalEconomy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
