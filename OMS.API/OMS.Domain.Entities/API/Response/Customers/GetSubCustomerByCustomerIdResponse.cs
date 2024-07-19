namespace OMS.Domain.Entities.API.Response.Customers
{
    public class GetSubCustomerByCustomerIdResponse
    {
        public int? SubCustomerMainCustomerId { get; set; }
        public int? CustomerId { get; set; }
        public int? SubCustomerId { get; set; }
        public string? SubCustomerName { get; set; }
        public string? CountryName { get; set; }
        public string? TaxId { get; set; }
    }
}
