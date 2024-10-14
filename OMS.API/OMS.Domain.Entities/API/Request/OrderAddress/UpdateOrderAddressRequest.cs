namespace OMS.Domain.Entities.API.Request.OrderAddress
{
    public class UpdateOrderAddressRequest
    {
        public int? OrderAddressId { get; set; }
        public int? OrderId { get; set; }
        public int? BillingAddressId { get; set; }
        public int? ShippingAddressId { get; set; }
        public int? OrderItemId { get; set; } = 0;
    }
}
