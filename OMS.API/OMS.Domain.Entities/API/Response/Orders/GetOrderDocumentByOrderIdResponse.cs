namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetOrderDocumentByOrderIdResponse
    {
        public int? OrderDocumentId { get; set; }
        public string? DocumentName { get; set; }
        public byte? DocumentTypeId { get; set; }
        public string? Type { get; set; }
        public long? OrderItemId { get; set; }
    }
}
