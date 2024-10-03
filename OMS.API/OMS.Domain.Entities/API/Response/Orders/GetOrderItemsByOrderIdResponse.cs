using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetOrderItemsByOrderIdResponse
    {
        public string? CatalogId {  get; set; }
        public string? CasNumber { get; set; }
        public decimal? ItemUnitPrice {  get; set; }
        public byte? OrderItemStatusId {  get; set; }
        public string? ItemStatus { get; set; }
        public decimal? PackSize {  get; set; }
    }
}
