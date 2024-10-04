using OMS.Domain.Entities.API.Request.Common;

namespace OMS.Domain.Entities.Entity.OrderDocument
{
    public class OrderDocumentDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? OrderDocumentId { get; set; }
        public string? DocumentName { get; set; }
        public int? OrderId { get; set; }
        public long? OrderItemId { get; set; }
        public byte? DocumentType { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }

        public List<OrderDocumentList>? DocumentOrderList { get; set; }

    }
}
