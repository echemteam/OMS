namespace OMS.Domain.Entities.API.Response.Customers
{
    public class GetCustomersBasicInformationByIdResponse
    {
        public string? Name { get; set; }
        public short? GroupTypeId { get; set; }
        public string? Type { get; set; }
        public short? TerritoryId { get; set; }
        public string? Territory { get; set; }
        public short? CountryId { get; set; }
        public string? CountryName { get; set; }
        public string? EmailAddress { get; set; }
        public string? Website { get; set; }
        public string? TaxId { get; set; }
        public bool? IsBuyingForThirdParty { get; set; }
        public short? StatusId { get; set; }
        public string? Status { get; set; }
        public string? ResponsibleUserId { get; set; }
        public string? ResponsibleUserName { get; set; }
        public bool? IsSubCustomer { get; set; }
    }
}
