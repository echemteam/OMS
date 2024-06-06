using OMS.Domain.Entities.Entity.Address;

namespace OMS.Domain.Entities.API.Request.Address
{
    public class UpdateAddressRequest 
    {
        public int? CustomerId { get; set; }
        public int? AddressId { get; set; }
        public short? AddressTypeId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressLine3 { get; set; }
        public string? AddressLine4 { get; set; }
        public string? AddressLine5 { get; set; }
        public int? CityId { get; set; }
        public int? StateId { get; set; }
        public short? CountryId { get; set; }
        public int? ZipCode { get; set; }

    }
}
