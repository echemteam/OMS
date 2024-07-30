using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationBankDetailsDto
    {
        public short? OrganizationBankDetailId { get; set; }
        public string? BeneficiaryName { get; set; }
        public string? CheckingAccountNumber { get; set; }
        public string? RoutingAccountNumber { get; set; }
        public string? SwiftCode { get; set; }
        public string? BankAddress { get; set; }
        public string? BankBranch { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}
