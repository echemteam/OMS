namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationOtherSettingsResponse
    {
        public int? OrganizationOtherSettingId { get; set; }
        public byte? OrganizationId { get; set; }
        public string? Name { get; set; }
        public byte? DefaultPaymentTerms { get; set; }
        public string? PaymentTerm { get; set; }
        public string? FedexAccountDetail { get; set; }
    }
}
