using OMS.Domain.Entities.API.Response.Address;

namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationBusinessAddressesResponse
    {
        public byte? OrganizationBusinessAddressId { get; set; }
        public GetAddressResponse? RegisteredAddress { get; set; }
        public GetAddressResponse? PhysicalAddress { get; set; }
        public GetAddressResponse? RemitToAddress { get; set; }
        public GetAddressResponse? BillToAddress { get; set; }
        public GetAddressResponse? LabAddress { get; set; }
        public GetAddressResponse? WarehouseAddress { get; set; }
        public int? RegisteredAddressId { get; set; }
        public int? PhysicalAddressId { get; set; }
        public int? RemitToAddressId { get; set; }
        public int? BillToAddressId { get; set; }
        public int? LabAddressId { get; set; }
        public int? WarehouseAddressId { get; set; }
    }
}
