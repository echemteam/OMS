namespace OMS.Domain.Entities.API.Response.Customers
{
    public class GetCustomersResponse
    {
        public int? CustomerId { get; set; }
        public string? Name { get; set; }
        public string? TaxId { get; set; }
        public string? Website { get; set; }
        public short? StatusId { get; set; }
        public string? Status { get; set; }
    }
}
