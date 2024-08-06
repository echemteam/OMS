namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllAddressesByCustomerIdAndAddressTypeIdResponse
    {
        public int? AddressId { get; set; }
        public short? AddressTypeId { get; set; }
        public string? AddressType { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressLine3 { get; set; }
        public string? AddressLine4 { get; set; }
        public string? AddressLine5 { get; set; }
        public string? CityId { get; set; }
        public string? CityName { get; set; }
        public string? StateId { get; set; }
        public string? StateName { get; set; }
        public string? CountryId { get; set; }
        public string? CountryName { get; set; }
        public int? ZipCode { get; set; }
    }
}
