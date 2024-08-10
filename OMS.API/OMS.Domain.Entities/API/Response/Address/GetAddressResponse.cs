namespace OMS.Domain.Entities.API.Response.Address
{
    public class GetAddressResponse
    {
        public int? AddressId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public int? StateId { get; set; }
        public string? StateName { get; set; }
        public short? CountryId { get; set; }
        public string? CountryName { get; set; }
        public int? ZipCode { get; set; }

    }
}
