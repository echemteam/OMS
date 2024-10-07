namespace OMS.Domain.Entities.API.Request.OrderItem
{
    public class UpdateOrderItemDetailRequest
    {
        public long? OrderItemId { get; set; }
        public int? OrderId { get; set; }
        public string? CatalogId { get; set; }
        public string? CasNumber { get; set; }
        public string? MdlNumber { get; set; }
        public string? ChemicalName { get; set; }
        public DateTime? RequestDate { get; set; }
        public DateTime? PromiseDate { get; set; }
        public string? OrderPriority { get; set; }
        public string? EntityType { get; set; }
        public string? Note { get; set; }
    }
}
