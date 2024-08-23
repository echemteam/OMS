namespace OMS.Domain.Entities.API.Request.CustomerDocuments
{
    public class AddCustomerDocumentsRequest
    {
        //public string? Name { get; set; }
        public int? CustomerId { get; set; }
        public string? StoragePath { get; set; }
        public List<DocumentList>? DocumentInfoList { get; set; }
    }

    public class DocumentList
    {
        public byte? DocumentTypeId { get; set; }
        public string? Attachment { get; set; }
        public string? Base64File { get; set; }
    }
}
