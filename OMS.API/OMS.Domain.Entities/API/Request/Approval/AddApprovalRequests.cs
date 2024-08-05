using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Approval
{
    public class AddApprovalRequests
    {
        public int? ModuleId { get; set; }
        public int? FunctionalityId { get; set; }
        public int? TableId { get; set; }
        public int? FunctionalityEventId { get; set; }
        public int? FunctionalitiesFieldId { get; set; }
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
    }
}
