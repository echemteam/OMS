namespace OMS.Domain.Entities.API.Request.Customers
{
    public class UpdateCustomerSubCompanyRequest
    {
        public int? CustomerId { get; set; }
        public bool? IsSubCompany { get; set; }
    }
}
