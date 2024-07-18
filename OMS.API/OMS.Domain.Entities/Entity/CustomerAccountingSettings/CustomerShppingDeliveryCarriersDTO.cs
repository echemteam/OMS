namespace OMS.Domain.Entities.Entity.CustomerAccountingSettings
{
    public class CustomerShppingDeliveryCarriersDTO :BaseCustomerShppingDeliveryCarriersDTO, IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? DeliveryAccountId { get; set; }
        public string? Name { get; set; }
        public long? CustomerDeliveryCarrierId { get; set; }
        public short? CarrierId { get; set; }
        public string? AccountNumber { get; set; }
        public int? CustomerId { get; set; }
        public bool? IsPrimary { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
        public bool? IsByDefault { get; set; }
        public decimal? HandlingFee { get; set; }
    }
}
