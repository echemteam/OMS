namespace OMS.Domain.Entities.API.Response.Supplier
{
    public class GetSupplierDetailsBySupplierNameResponse
    {
        public int? SupplierId { get; set; }
        public string? Name { get; set; }
        public string? GroupType { get; set; }
        public string? CountryName { get; set; }
        public string? EmailAddress { get; set; }
        public string? TaxId { get; set; }
        public string? Status { get; set; }
    }
}
