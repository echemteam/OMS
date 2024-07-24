namespace OMS.Domain.Entities.Entity.SupplierAccoutingSetting
{
    public class SupplierAccoutingSettingDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? SupplierAccountingSettingId { get; set; }
        public byte? PaymentTermId { get; set; }
        public int? SupplierId { get; set; }
        public byte? InvoiceSubmissionMethod { get; set; }
        public byte? PoDeliveryMethodId { get; set; }
        public bool? IsActive { get; set; }
        public string? PODeliveryMethodDetail { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
        public DateTime? DeletedAt { get; set; }

    }
}
