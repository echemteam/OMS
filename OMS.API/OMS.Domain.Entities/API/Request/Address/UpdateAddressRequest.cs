namespace OMS.Domain.Entities.API.Request.Address
{
    public class UpdateAddressRequest
    {
        public int? CustomerAddressId { get; set; }
        public int? CustomerId { get; set; }
        public int? AddressId { get; set; }
        public short? AddressTypeId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressLine3 { get; set; }
        public string? AddressLine4 { get; set; }
        public string? AddressLine5 { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public int? StateId { get; set; }
        public string? StateName { get; set; }

        public short? CountryId { get; set; }
        public string? ZipCode { get; set; }
        public int? SupplierId { get; set; }
        public bool? IsPreferredShipping { get; set; }
        public bool? IsPreferredBilling { get; set; }
    }
}
