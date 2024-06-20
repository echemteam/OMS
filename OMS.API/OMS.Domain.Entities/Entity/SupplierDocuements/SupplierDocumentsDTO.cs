using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.SupplierDocuements
{
    public class SupplierDocumentsDTO: IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? SupplierDocumentId  { get; set; }
        public string? Name { get; set; }
        public byte? DocumentTypeId { get; set; }
        public int? SupplierId { get; set; }
        public short? StatusId { get; set; }
        public string? Attachment { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public short? ApprovedBy { get; set; }
    }
}
