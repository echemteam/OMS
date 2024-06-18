namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class UpdateAddressForSupplierRequest
    {
        public int? SupplierId { get; set; }
        public int? AddressId { get; set; }
        public short? AddressTypeId { get; set; }
        public bool? IsPreferredShipping { get; set; }
        public bool? IsPreferredBilling { get; set; }
    }
}
