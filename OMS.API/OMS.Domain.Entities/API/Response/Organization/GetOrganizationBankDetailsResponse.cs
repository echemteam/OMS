﻿namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationBankDetailsResponse
    {
        public byte? OrganizationBankDetailId { get; set; }
        public string? BeneficiaryName { get; set; }
        public string? CheckingAccountNumber { get; set; }
        public string? RoutingAccountNumber { get; set; }
        public string? SwiftCode { get; set; }
        public string? BankAddress { get; set; }
        public string? BankBranch { get; set; }
    }
}
