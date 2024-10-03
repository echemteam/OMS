namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetOrderAddressByOrderIdResponse
    {
        public AddressResponse? BillingAddress { get; set; }
        public AddressResponse? ShippingAddress { get; set; }
    }

    public class AddressResponse
    {
        public int? AddressId { get; set; }
        public short? AddressTypeId { get; set; }
        public string? Type { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressLine3 { get; set; }
        public string? AddressLine4 { get; set; }
        public string? AddressLine5 { get; set; }
        public short? CountryId { get; set; }
        public string? CountryName { get; set; }
        public int? StateId { get; set; }
        public string? StateName { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public string? ZipCode { get; set; }
        public bool? IsPreferredShipping { get; set; }
        public bool? IsPreferredBilling { get; set; }
    }
}
