namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class AddAddressForSupplierRequest
    {
        public int? SupplierId { get; set; }
        public int? AddressId { get; set; }
        public short? AddressTypeId { get; set; }
    }
}
