namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class AddEditSupplierBasicInformationRequest
    {
        public int? SupplierId { get; set; }
        public short? GroupTypeId { get; set; }
        public short? SupplierTypeId { get; set; }
        public string? Name { get; set; }
        public string? DbaName { get; set; }
        public short? TerritoryId { get; set; }
        public string? Website { get; set; }
        public short? CountryId { get; set; }
        public string? TaxId { get; set; }
        public string? Note { get; set; }
        public string? EmailAddress { get; set; }
       // public short? ResponsibleUserId { get; set; }
        public long? SupplierNoteId { get; set; }
    }
}
