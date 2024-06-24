namespace OMS.Domain.Entities.API.Request.Customers
{
    public class UpdateAddressForCustomerRequest
    {
        public int? CustomerAddressId { get; set; }
        public int? CustomerId { get; set; }
        public int? AddressId { get; set; }
        public short? AddressTypeId { get; set; }
        public bool? IsPreferredShipping { get; set; }
        public bool? IsPreferredBilling { get; set; }
    }
}
