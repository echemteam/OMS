namespace OMS.Domain.Entities.API.Response.Orders
{
    public class AddEditOrderContactInformationRequest
    {
        public int? OrderId { get; set; }
        public bool? IsEndUser { get; set; }
        public int? EndUserContactId { get; set; }
        public bool? IsInvoiceSubmission { get; set; }
        public int? InvoiceSubmissionContactId { get; set; }
        public bool? IsPurchasing { get; set; }
        public int? PurchasingContactId { get; set; }
        public string? ReferenceNumber { get; set; }
    }
}
