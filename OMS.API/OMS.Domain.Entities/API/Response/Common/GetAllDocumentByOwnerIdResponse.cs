namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllDocumentByOwnerIdResponse
    {
        /// DocumentId is used to return the CustomerDocumentId or SupplierDocumentId.
        public int? DocumentId { get; set; }
        public string? Name { get; set; }
        public string? Attachment { get; set; }
    }
}
