namespace OMS.Domain.Entities.API.Request.Address
{
    public class AddAddressRequest
    {
        public int? CustomerId { get; set; }
        public int? SupplierId { get; set; }
        public string? AddressTypeId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressLine3 { get; set; }
        public string? AddressLine4 { get; set; }
        public string? AddressLine5 { get; set; }
        public short? CountryId { get; set; }
        public int? StateId { get; set; }
        public string? StateName { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public int? ZipCode { get; set; }
        public bool? IsPreferredShipping { get; set; }
        public bool? IsPreferredBilling { get; set; }
        public bool? IsShippingAndBilling { get; set; }

    }
}
