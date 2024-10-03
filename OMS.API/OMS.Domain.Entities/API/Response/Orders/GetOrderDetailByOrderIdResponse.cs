namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetOrderDetailByOrderIdResponse
    {
        public int? OrderId { get; set; }
        public int? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public int? SubCustomerId { get; set; }
        public string? SubCustomerName { get; set; }
        public string? PoNumber { get; set; }
        public DateTime? OrderReceivedDate { get; set; }
        public string? ReferenceNumber { get; set; }
        public short? OrderStatusId { get; set; }
        public string? Status { get; set; }
        public short? OrderSubStatusId { get; set; }
        public string? SubStatus { get; set; }
        public byte? OrderMethodId { get; set; }
        public string? OrderMethod { get; set; }
        public int BillingAddressId { get; set; }
        public int ShippingAddressId { get; set; }
        public GetOrderAddressByOrderIdResponse OrderAddressInformation { get; set; }
        public List<GetOrderContactByOrderIdResponse>? OrderContactList { get; set; }
        public List<GetOrderDocumentByOrderIdResponse>? OrderDocumentList { get; set; }
    }
}
