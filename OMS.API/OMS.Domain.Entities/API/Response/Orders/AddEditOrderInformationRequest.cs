namespace OMS.Domain.Entities.API.Response.Orders
{
    public class AddEditOrderInformationRequest
    {
        public int? OrderId { get; set; }
        public byte? OrderMethodId { get; set; }
        public int? CustomerId { get; set; }
        public int? SubCustomerId { get; set; }
        public string? PoNumber { get; set; }
        public DateTime? OrderReceivedDate { get; set; }
        public int? OrderAddressId { get; set; }
        public int? BillingAddressId { get; set; }
        public int? ShippingAddressId { get; set; }
    }
}
