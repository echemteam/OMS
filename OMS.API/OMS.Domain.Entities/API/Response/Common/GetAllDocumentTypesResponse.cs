namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllDocumentTypesResponse
    {
        public byte? DocumentTypeId { get; set; }
        public string? Type { get; set; }
        public bool? IsForCustomers { get; set; }
        public bool? IsForSuppliers { get; set; }
    }
}
