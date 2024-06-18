namespace OMS.Domain.Entities.API.Response.Supplier
{
    public class GetSupplierBasicInformationByIdResponse
    {
        public int? SupplierId { get; set; }
        public short? GroupTypeId { get; set; }
        public string? GroupType { get; set; }
        public short? SupplierTypeId { get; set; }
        public string? SupplierType { get; set; }
        public string? Name { get; set; }
        public string? DbaName { get; set; }
        public short? TerritoryId { get; set; }
        public string? Website { get; set; }
        public short? CountryId { get; set; }
        public string? CountryName { get; set; }
        public string? TaxId { get; set; }
        public short? StatusId { get; set; }
        public string? Status { get; set; }

    }
}
