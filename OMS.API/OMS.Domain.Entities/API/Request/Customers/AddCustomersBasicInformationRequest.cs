namespace OMS.Domain.Entities.API.Request.Customers
{
    public class AddCustomersBasicInformationRequest
    {
        public string? Name { get; set; }
        public short? GroupTypeId { get; set; }
        public short? TerritoryId { get; set; }
        public short? CountryId { get; set; }
        public string? EmailAddress { get; set; }
        public string? Website { get; set; }
        public string? InvoiceSubmissionInstruction { get; set; }
        public string? Note { get; set; }
        public bool? IsCompany { get; set; }
        public string? TaxId { get; set; }
        public string? BillingCurrency { get; set; }
    }
}
