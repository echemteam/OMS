namespace OMS.Domain.Entities.API.Request.Customers
{
    public class UpdateCustomerSubCustomerRequest
    {
        public int? CustomerId { get; set; }
        public bool? IsSubCustomer { get; set; }
    }
}
