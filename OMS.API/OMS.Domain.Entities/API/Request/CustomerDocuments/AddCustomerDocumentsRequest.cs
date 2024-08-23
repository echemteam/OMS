using OMS.Domain.Entities.API.Request.Common;

namespace OMS.Domain.Entities.API.Request.CustomerDocuments
{
    public class AddCustomerDocumentsRequest
    {
        public int? CustomerId { get; set; }
        public string? StoragePath { get; set; }
        public List<DocumentList>? DocumentInfoList { get; set; }
    }
}
