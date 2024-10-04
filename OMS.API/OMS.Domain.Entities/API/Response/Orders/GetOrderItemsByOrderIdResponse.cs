using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetOrderItemsByOrderIdResponse
    {   
        public long? OrderItemId { get; set; }
        public int? OrderId { get; set; }   
        public string? CatalogId {  get; set; }
        public string? CasNumber { get; set; }
        public decimal? ItemUnitPrice {  get; set; }
        public byte? OrderItemStatusId {  get; set; }
        public string? ItemStatus { get; set; }
        public decimal? PackSize {  get; set; }
        public decimal? SubTotalPrice {  get; set; }
        public string? MdlNumber { get; set; }
        public string? ChemicalName { get; set; }
        public DateTime? RequestDate { get; set; }
        public DateTime? PromiseDate { get; set; }
        public string? OrderPriority { get; set; }
        public decimal Quantity {  get; set; }
        public string? Unit { get; set; }
        public byte? Unitid { get; set; }
    }
}
