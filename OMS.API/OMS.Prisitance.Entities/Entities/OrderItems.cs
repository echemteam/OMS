using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("OrderItems")]
    public class OrderItems
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? OrderItemId { get; set; }
        public int? OrderId { get; set; }
        public int? CatalogId { get; set; }
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
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}
