namespace OMS.Domain.Entities.API.Response.CustomerDocuments
{
    public class GetCustomerDocumentsByIdResponse
    {
        public int? CustomerDocumentId { get; set; }
        public string? Name { get; set; }
        public byte? DocumentTypeId { get; set; }
        public string? Type { get; set; }
        public int? CustomerId { get; set; }
        public string? Attachment { get; set; }
    }
}
