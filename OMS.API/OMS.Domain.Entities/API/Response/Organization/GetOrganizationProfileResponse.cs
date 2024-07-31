namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationProfileResponse
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
    }
}
