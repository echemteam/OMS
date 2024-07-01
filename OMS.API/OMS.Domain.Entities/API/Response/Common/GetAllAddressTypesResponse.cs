namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllAddressTypesResponse
    {
        public short? AddressTypeId { get; set; }
        public string? Type { get; set; }
        public bool? IsForCustomers { get; set; }
        public bool? IsForSuppliers { get; set; }
    }
}
