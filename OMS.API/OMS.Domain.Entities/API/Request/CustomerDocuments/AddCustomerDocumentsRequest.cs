namespace OMS.Domain.Entities.API.Request.CustomerDocuments
{
    public class AddCustomerDocumentsRequest
    {
        public string? Name { get; set; }
        public byte? DocumentTypeId { get; set; }
        public int? CustomerId { get; set; }
        public string? Attachment { get; set; }
        public string? Base64File { get; set; }
        public string? StoragePath { get; set; }

    }
}
