namespace OMS.Domain.Entities.API.Response.Supplier
{
    public class GetSuppliersResponse
    {
        public int? SupplierId { get; set; }
        public string? Name { get; set; }
        public string? Website { get; set; }
        public string? TaxId { get; set; }
        public string? InActiveReason { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? StatusId { get; set; }
        public string? Status { get; set; }

        public short ResponsibleUserId { get; set; }
        public string? ResponsibleUserName { get; set; }
    }
}
