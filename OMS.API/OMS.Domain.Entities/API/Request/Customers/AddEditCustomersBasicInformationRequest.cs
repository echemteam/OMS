namespace OMS.Domain.Entities.API.Request.Customers
{
    public class AddEditCustomersBasicInformationRequest
    {
        public int? CustomerId { get; set; }
        public string? Name { get; set; }
        public short? GroupTypeId { get; set; }
        public short? TerritoryId { get; set; }
        public short? CountryId { get; set; }
        public string? EmailAddress { get; set; }
        public string? Website { get; set; }
        public string? Note { get; set; }
        public string? TaxId { get; set; }
        public bool? IsBuyingForThirdParty {  get; set; }
        public short? ResponsibleUserId {  get; set; }
        public long? CustomerNoteId { get; set; }
        public bool? IsSubCompany { get; set; }
    }
}
