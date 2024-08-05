namespace OMS.Domain.Entities.API.Response.Customers
{
    public class GetCustomerAuditHistoryByCustomerIdResponse
    {
        public int? CustomerAuditHistoryId { get; set; }
        public int? CustomerId { get; set; }
        public string? EventName { get; set; }
        public short? ChangedBy { get; set; }
        public DateTime? ChangedAt { get; set; }
        public string? Description { get; set; }
        public string? Name { get; set; }
        public string? EventStatus { get; set; }
    }
}
