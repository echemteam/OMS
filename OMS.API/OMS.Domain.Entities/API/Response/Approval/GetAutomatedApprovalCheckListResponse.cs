using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Approval
{
    public class GetAutomatedApprovalCheckListResponse
    {
        public bool? IsValid { get; set; }
        public string? Messages {  get; set; }
    }
}
