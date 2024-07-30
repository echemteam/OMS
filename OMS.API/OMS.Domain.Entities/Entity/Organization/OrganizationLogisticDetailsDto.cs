using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationLogisticDetailsDto
    {
        public short? OrganizationLogisticDetailId { get; set; }
        public string? FedExAccount { get; set; }
        public string? DHLAccount { get; set; }
        public string? UPSAccount { get; set; }
        public string? USPSAccount { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
