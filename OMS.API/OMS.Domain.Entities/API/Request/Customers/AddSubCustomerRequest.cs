namespace OMS.Domain.Entities.API.Request.Customers
{
    public class AddSubCustomerRequest
    {
        public int? CustomerId { get; set; }
        public string? SubCustomerId { get; set; }
    }
}
