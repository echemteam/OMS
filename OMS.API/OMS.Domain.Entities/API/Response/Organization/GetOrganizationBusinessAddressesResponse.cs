using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationBusinessAddressesResponse
    {
        public short? OrganizationBusinessAddressId { get; set; }
        public int? RegisteredAddressId { get; set; }
        public int? PhysicalAddressId { get; set; }
        public int? RemitToAddressId { get; set; }
        public int? BillToAddressId { get; set; }
        public int? LabAddressId { get; set; }
        public int? WarehouseAddressId { get; set; }
    }
}
