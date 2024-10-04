namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class BeneficiaryDetailsResponse
    {
        public int? AddressId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public int? StateId { get; set; }
        public string? StateName { get; set; }
        public short? CountryId { get; set; }
        public short? CountryName { get; set; }
        public string? ZipCode { get; set; }
        public string? BeneficiaryName { get; set; }
        public string? RecipientPhoneNumber { get; set; }
    }
}
