using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationBankDetailsRequest
    {
        public short? OrganizationBankDetailId {  get; set; }
        public string? BeneficiaryName {  get; set; }
        public string? CheckingAccountNumber {  get; set; }
        public string? RoutingAccountNumber { get; set; }
        public string? SwiftCode {  get; set; }
        public string? BankAddress {  get; set; }
        public string? BankBranch {  get; set; }
    }
}
