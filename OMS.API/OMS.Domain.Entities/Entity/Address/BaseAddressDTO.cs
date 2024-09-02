namespace OMS.Domain.Entities.Entity.Address
{
    public class BaseAddressDto
    {
        public short? AddressTypeId { get; set; }
        public string? Title { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressLine3 { get; set; }
        public string? AddressLine4 { get; set; }
        public string? AddressLine5 { get; set; }
        public int? StateId { get; set; }
        public string? StateName { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public short? CountryId { get; set; }
        public string? ZipCode { get; set; }
        public string? Notes { get; set; }
    }
}
