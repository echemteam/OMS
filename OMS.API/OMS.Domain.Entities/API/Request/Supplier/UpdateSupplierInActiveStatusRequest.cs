namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class UpdateSupplierInActiveStatusRequest
    {
        public int? SupplierId { get; set; }
        public short? StatusId { get; set; }
        public string? InActiveReason { get; set; }
    }
}
