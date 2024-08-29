using OMS.Domain.Entities.API.Request.OrderContact;
using OMS.Domain.Entities.API.Request.Orders;

namespace OMS.Domain.Entities.API.Response.Orders
{
    public class AddOrderRequest
    {
        public int? OrderId { get; set; }
        public byte? OrderMethodId { get; set; }
        public int? CustomerId { get; set; }
        public int? SubCustomerId { get; set; }
        public string? PoNumber { get; set; }
        public DateTime? PoDate { get; set; }
        public DateTime? OrderReceivedDate { get; set; }
        public bool? IsEndUser { get; set; }
        public bool? IsInvoiceSubmission { get; set; }
        public bool? IsPurchasing { get; set; }
        public string? ReferenceNumber { get; set; }
        public decimal? PO_TotalOrderAmount { get; set; }
        public byte? CurrencyId { get; set; }
        //public short? OrderStatusId { get; set; }
        //public short? OrderSubStatusId { get; set; }
        public int? BillingAddressId { get; set; }
        public int? ShippingAddressId { get; set; }
        public List<OrderItemsRequest>? orderItemsList { get; set; }
        public List<OrderContactRequest>? orderContactsList { get; set; }
        public int? OrderChargeId { get; set; }
        public string? ChargeType { get; set; }
        public string? Name { get; set; }
        public long? OrderItemId { get; set; }
        public string? DocumentName { get; set; }
        public byte? DocumentType { get; set; }
        public string? Base64File { get; set; }
        public string? StoragePath { get; set; }

    }
}
