using OMS.Domain.Entities.API.Request.CustomerDocuments;

namespace OMS.Domain.Entities.Entity.CustomerDocuments
{
    public class CustomerDocumentsDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? CustomerDocumentId { get; set; }
        public short? StatusId { get; set; }
        public int? CustomerId { get; set; }
        public string? StoragePath { get; set; }
        public List<DocumentList>? DocumentInfoList { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public short? ApprovedBy { get; set; }

        //public string? Attachment { get; set; }
        //public string? Name { get; set; }
        //public byte? DocumentTypeId { get; set; }
        //public int? CustomerId { get; set; }
    }
}
