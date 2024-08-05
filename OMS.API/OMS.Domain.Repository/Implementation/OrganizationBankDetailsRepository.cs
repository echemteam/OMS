using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationBankDetailsRepository : BaseRepository<OrganizationBankDetails>, IOrganizationBankDetailsRepository
    {
        const string ADDEDITORGANIZATIONBANKDETAILS = "AddEditOrganizationBankDetails";
        const string GETORGANIZATIONBANKDETAILS = "GetOrganizationBankDetails";
        public OrganizationBankDetailsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<AddEntityDTO<int>> AddEditOrganizationBankDetails(OrganizationBankDetailsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITORGANIZATIONBANKDETAILS, new
            {
                requestData.OrganizationBankDetailId,
                requestData.BeneficiaryName,
                requestData.CheckingAccountNumber,
                requestData.RoutingAccountNumber,
                requestData.SwiftCode,
                requestData.BankAddress,
                requestData.BankBranch,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationBankDetailsResponse> GetOrganizationBankDetails()
        {
            GetOrganizationBankDetailsResponse organizationBankDetails = await _context.GetFrist<GetOrganizationBankDetailsResponse>(GETORGANIZATIONBANKDETAILS, CommandType.StoredProcedure);
            return organizationBankDetails;
        }
    }
}
