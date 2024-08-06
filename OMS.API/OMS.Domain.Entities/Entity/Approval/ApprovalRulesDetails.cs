using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Approval
{
    public class ApprovalRulesDetails
    {
        public int ApprovalConfigurationId { get; set; }
        public string RuleName { get; set; }
        //public  ApproverRoleId { get; set; }
        //public string ApprovalAction { get; set; }
    }
}
