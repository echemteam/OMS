using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.SupplierDocuements
{
    public class AddSupplierDocumentsRequest
    {
        public string? Name { get; set; }
        public byte? DocumentTypeId { get; set; }
        public int? SupplierId { get; set; }
        public string? Attachment { get; set; }
        public string? Base64File { get; set; }
        public string? StoragePath { get; set; }

    }
}
