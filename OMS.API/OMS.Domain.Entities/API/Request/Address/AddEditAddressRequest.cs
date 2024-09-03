namespace OMS.Domain.Entities.API.Request.Address
{
    public class AddEditAddressRequest
    {
        public int? AddressId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? CityId { get; set; }
        public int? StateId { get; set; }
        public short? CountryId { get; set; }
        public string? ZipCode { get; set; } 

    }
}
