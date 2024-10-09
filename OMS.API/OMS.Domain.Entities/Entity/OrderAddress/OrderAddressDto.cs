namespace OMS.Domain.Entities.Entity.OrderAddress
{
    public class OrderAddressDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? OrderAddressId { get; set; }
        public int? OrderId { get; set; }
        public int? BillingAddressId { get; set; }
        public int? ShippingAddressId { get; set; }
        public int? OrderItemId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}
