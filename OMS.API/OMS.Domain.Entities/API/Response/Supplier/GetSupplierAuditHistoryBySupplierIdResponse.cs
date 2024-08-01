namespace OMS.Domain.Entities.API.Response.Supplier
{
    public class GetSupplierAuditHistoryBySupplierIdResponse
    {
        public int? SupplierAuditHistoryId { get; set; }
        public int? SupplierId { get; set; }
        public string? EventName { get; set; }
        public short? ChangedBy { get; set; }
        public DateTime? ChangedAt { get; set; }
        public string? Description { get; set; }
        public string? Name { get; set; }
        public string? EventStatus { get; set; }
    }
}
