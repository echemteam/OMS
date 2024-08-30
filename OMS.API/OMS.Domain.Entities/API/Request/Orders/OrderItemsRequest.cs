namespace OMS.Domain.Entities.API.Request.Orders
{
    public class OrderItemsRequest
    {
        public string? CatalogId { get; set; }
        public string? CasNumber { get; set; }
        public string? MdlNumber { get; set; }
        public string? ChemicalName { get; set; }
        public DateTime? RequestDate { get; set; }
        public DateTime? PromiseDate { get; set; }
        public string? OrderPriority { get; set; }
        public long? ReferenceEntityId { get; set; }
        public short? OrderItemStatusId { get; set; }
        public short? OrderItemSubStatusId { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? PackSize { get; set; }
        public byte? Unitid { get; set; }
        public decimal? ItemUnitPrice { get; set; }
        public decimal? PoItemUnitPrice { get; set; }
        public decimal? SubTotalPrice { get; set; }
        public decimal? SubTotalPOPrice { get; set; }
        public short? OrderDisputTypeId { get; set; }
        public string? OrderTimeCancelReason { get; set; }
        public string? EntityType { get; set; }
        public string? Note { get; set; }
        public int? EntityId { get; set; } 
    }
}
