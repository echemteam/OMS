namespace OMS.Domain.Entities.API.Request.Customers
{
    public class UpdateCustomerInActiveStatusRequest
    {
        public int? CustomerId { get; set; }
        public short? StatusId { get; set; }
        public string? InActiveReason { get; set; }

    }
}
