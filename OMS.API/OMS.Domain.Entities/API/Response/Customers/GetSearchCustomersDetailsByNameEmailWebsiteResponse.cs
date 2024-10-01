namespace OMS.Domain.Entities.API.Response.Customers
{
    public class GetSearchCustomersDetailsByNameEmailWebsiteResponse
    {
        public int? CustomerId { get; set; }
        public string? Name { get; set; }
        public string? GroupType { get; set; }
        public string? CountryName { get; set; }
        public string? EmailAddress { get; set; }
        public string? Website { get; set; }
        public string? TaxId { get; set; }
        public string? Status { get; set; }
        public string? Reason { get; set; }
    }
}
