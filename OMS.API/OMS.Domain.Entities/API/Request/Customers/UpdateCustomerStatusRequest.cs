namespace OMS.Domain.Entities.API.Request.Customers
{
    public class UpdateCustomerStatusRequest
    {
        public int? CustomerId { get; set; }
        public short? StatusId { get; set; }
    }
}
