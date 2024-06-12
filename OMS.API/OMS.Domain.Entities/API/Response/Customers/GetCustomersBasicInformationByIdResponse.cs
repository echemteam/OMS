namespace OMS.Domain.Entities.API.Response.Customers
{
    public class GetCustomersBasicInformationByIdResponse
    {
        public string? Name { get; set; }
        public short? GroupTypeId { get; set; }
        public string? Type { get; set; }
        public short? TerritoryId { get; set; }
        public string? Territory { get; set; }
        public short? CountryId { get; set; }
        public string? CountryName { get; set; }
        public string? EmailAddress { get; set; }
        public string? Website { get; set; }
        public string? InvoiceSubmissionInstruction { get; set; }
        public string? Note { get; set; }
        public bool? IsCompany { get; set; }
        public string? TaxId { get; set; }
        public string? BillingCurrency { get; set; }

    }
}
