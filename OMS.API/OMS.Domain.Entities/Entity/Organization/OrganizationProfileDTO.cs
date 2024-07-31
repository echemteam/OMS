namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationProfileDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public byte? OrganizationProfileId { get; set; }
        public string? RegisteredName { get; set; }
        public string? DBAName { get; set; }
        public DateTime? DateIncorporated { get; set; }
        public string? NAICSCode { get; set; }
        public string? EIN { get; set; }
        public string? TXTaxpayerNumber { get; set; }
        public string? SOSFileNumber { get; set; }
        public string? WebFileNumber { get; set; }
        public string? TWCTaxAccountNumber { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
