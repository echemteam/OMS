namespace OMS.Domain.Entities.API.Request.Approval
{
    public class ValidateRequest
    {
        public int CustomerId { get; set; }
        public int SupplierId { get; set; }
        public bool? IsSubCustomer { get; set; }
    }
}
