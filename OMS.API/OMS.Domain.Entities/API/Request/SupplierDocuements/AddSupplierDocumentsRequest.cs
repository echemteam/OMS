

using OMS.Domain.Entities.API.Request.Common;

namespace OMS.Domain.Entities.API.Request.SupplierDocuements
{
    public class AddSupplierDocumentsRequest
    {
        public int? SupplierId { get; set; }
        public string? StoragePath { get; set; }
        public List<DocumentList>? DocumentInfoList { get; set; }
    }
}
