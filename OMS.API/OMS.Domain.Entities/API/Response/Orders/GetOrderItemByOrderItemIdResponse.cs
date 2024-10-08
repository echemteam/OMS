using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Orders
{
    public  class GetOrderItemByOrderItemIdResponse
    {
        public long? OrderItemId { get; set; }
        public string? CatalogId { get; set; }
        public string? CasNumber { get; set; }
        public string? ChemicalName {  get; set; }
        public string? MdlNumber {  get; set; }
        public int ShippingAddressId { get; set; }
        public string? OrderPriority {  get; set; }
        public DateTime? RequestDate {  get; set; }
        public DateTime? PromiseDate {  get; set; }
        public int? EntityId {  get; set; }
        public string? Note {  get; set; }
        public GetOrderAddressByOrderIdResponse OrderAddressInformation { get; set; }
    }
}
