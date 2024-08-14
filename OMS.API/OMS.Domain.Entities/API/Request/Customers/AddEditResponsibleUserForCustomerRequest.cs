namespace OMS.Domain.Entities.API.Request.Customers
{
    public class AddEditResponsibleUserForCustomerRequest
    {
        public int? CustomerId { get; set; }
        public string? UserId { get; set; }
    }
}
