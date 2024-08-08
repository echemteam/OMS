using OMS.Domain.Entities.Entity.CustomerNotes;

namespace OMS.Domain.Entities.Entity.Orders
{
    public class OrderDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? OrderId { get; set; }
        public byte? OrderMethodId { get; set; }
        public int? CustomerId { get; set; }
        public int? SubCustomerId { get; set; }
        public string? PoNumber { get; set; }
        public DateTime? OrderReceivedDate { get; set; }
        public bool? IsEndUser { get; set; }
        public int? EndUserContactId { get; set; }
        public bool? IsInvoiceSubmission { get; set; }
        public int? InvoiceSubmissionContactId { get; set; }
        public bool? IsPurchasing { get; set; }
        public int? PurchasingContactId { get; set; }
        public string? ReferenceNumber { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}
