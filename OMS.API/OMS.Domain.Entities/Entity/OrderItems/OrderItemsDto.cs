namespace OMS.Domain.Entities.Entity.OrderItems
{
    public class OrderItemsDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
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
        public long? ReferenceEntityId { get; set; }
        public short? OrderItemStatusId { get; set; }
        public short? OrderItemSubStatusId { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? PackSize { get; set; }
        public string? Unit { get; set; }
        public decimal? ItemUnitPrice { get; set; }
        public decimal? PoItemUnitPrice { get; set; }
        public decimal? SubTotalPrice { get; set; }
        public decimal? SubTotalPOPrice { get; set; }
        public short? OrderDisputTypeId { get; set; }
        public string? OrderTimeCancelReason { get; set; }
        public string? EntityType { get; set; }
        public string? Note { get; set; }
        public int? EntityId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}
