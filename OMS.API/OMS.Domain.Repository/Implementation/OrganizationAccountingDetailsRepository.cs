using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationAccountingDetailsRepository : BaseRepository<OrganizationAccountingDetails>, IOrganizationAccountingDetailsRepository
    {
        const string ADDEDITORGANIZATIONACCOUNTINGDETAILS = "AddEditOrganizationAccountingDetails";
        const string GETORGANIZATIONACCOUNTINGDETAILS = "GetOrganizationAccountingDetails";
        public OrganizationAccountingDetailsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<AddEntityDto<int>> AddEditOrganizationAccountingDetails(OrganizationAccountingDetailsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITORGANIZATIONACCOUNTINGDETAILS, new
            {
                requestData.OrganizationAccountingDetailId,
                requestData.CreditLimit,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationAccountingDetailsResponse> GetOrganizationAccountingDetails()
        {
            GetOrganizationAccountingDetailsResponse organizationAccountingDetails = await _context.GetFrist<GetOrganizationAccountingDetailsResponse>(GETORGANIZATIONACCOUNTINGDETAILS, CommandType.StoredProcedure);
            return organizationAccountingDetails;
        }
    }
}
