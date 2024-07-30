using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationLogisticDetailsResponse
    {
        public short? OrganizationLogisticDetailId {  get; set; }
        public string? FedExAccount {  get; set; }
        public string? DHLAccount { get; set; }
        public string? UPSAccount {  get; set; }
        public string? USPSAccount { get; set; }

    }
}
