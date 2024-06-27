namespace OMS.Domain.Entities.API.Request.Customers
{
    public class AddEditContactForCustomerRequest
    {
        public int? CustomerContactId { get; set; }
        public int? CustomerId { get; set; }
        public int? ContactId { get; set; }
        public short? ContactTypeId { get; set; }
        public bool? IsPrimary { get; set; }

    }
}
