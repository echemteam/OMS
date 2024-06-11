namespace OMS.Domain.Entities.API.Request.Customers
{
    public class UpdateCustomerApproveStatusRequest
    {
        public int? CustomerId { get; set; }
        public short? ApprovedBy { get; set; }

    }
}
