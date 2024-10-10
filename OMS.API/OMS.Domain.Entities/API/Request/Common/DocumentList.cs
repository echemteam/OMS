namespace OMS.Domain.Entities.API.Request.Common
{
    public class DocumentList
    {
        public string? Name { get; set; }
        public byte? DocumentTypeId { get; set; }
        public string? DocumentType { get; set; }
        public string? Attachment { get; set; }
        public string? Base64File { get; set; }
    }
}
