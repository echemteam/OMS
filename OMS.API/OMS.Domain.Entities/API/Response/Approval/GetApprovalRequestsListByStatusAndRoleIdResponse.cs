using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Approval
{
    public class GetApprovalRequestsListByStatusAndRoleIdResponse
    {
        public int? ApprovalRequestId { get; set; }
        public int? FunctionalityId { get; set; }
        public string? FunctionalityName { get; set; }
        public int? ModuleId { get; set; }
        public string? ModuleName { get; set; }
    }
}
