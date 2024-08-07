namespace OMS.Domain.Entities.Entity.CustomerAccountingSettings
{
    public class CustomerDeliveryMethodsDto : BaseCustomerDeliveryMethodsDto, IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? CustomerDeliveryMethodId { get; set; }
        public int? CustomerId { get; set; }
        public byte? DeliveryMethodId { get; set; }
        public string? Name { get; set; }
        public decimal? Charge { get; set; }
        public bool? IsPrimary { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
