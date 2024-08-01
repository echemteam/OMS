using OMS.Domain.Entities.API.Request.Address;

namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationBusinessAddressesRequest
    {
        public byte? OrganizationBusinessAddressId { get; set; }
        public AddEditAddressRequest? RegisteredAddress { get; set; }
        public AddEditAddressRequest? PhysicalAddress { get; set; }
        public AddEditAddressRequest? RemitToAddress { get; set; }
        public AddEditAddressRequest? BillToAddress { get; set; }
        public AddEditAddressRequest? LabAddress { get; set; }
        public AddEditAddressRequest? WarehouseAddress { get; set; }
        public int? RegisteredAddressId { get; set; }
        public int? PhysicalAddressId { get; set; }
        public int? RemitToAddressId { get; set; }
        public int? BillToAddressId { get; set; }
        public int? LabAddressId { get; set; }
        public int? WarehouseAddressId { get; set; }
    }
}
