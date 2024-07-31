using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationBusinessAddressesDto
    {
        public short? OrganizationBusinessAddressId { get; set; }
        public int? RegisteredAddressId { get; set; }
        public int? PhysicalAddressId { get; set; }
        public int? RemitToAddressId { get; set; }
        public int? BillToAddressId { get; set; }
        public int? LabAddressId { get; set; }
        public int? WarehouseAddressId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
