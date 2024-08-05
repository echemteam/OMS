using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationOtherChargesRepository : BaseRepository<OrganizationOtherCharges>, IOrganizationOtherChargesRepository
    {
        const string ADDEDITORGANIZATIONOTHERCHARGES = "AddEditOrganizationOtherCharges";
        const string GETORGANIZATIONOTHERCHARGES = "GetOrganizationOtherCharges";
        public OrganizationOtherChargesRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<AddEntityDTO<int>> AddEditOrganizationOtherCharges(OrganizationOtherChargesDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITORGANIZATIONOTHERCHARGES, new
            {
                requestData.OrganizationOtherChargeId,
                requestData.HandlingFees,
                requestData.BankWireFees,
                requestData.CreditCardServiceFees,
                requestData.ColdBoxFees,
                requestData.ITNFees,
                requestData.DefaultPaymentTerms,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationOtherChargesResponse> GetOrganizationOtherCharges()
        {
            GetOrganizationOtherChargesResponse organizationOtherCharges = await _context.GetFrist<GetOrganizationOtherChargesResponse>(GETORGANIZATIONOTHERCHARGES, CommandType.StoredProcedure);
            return organizationOtherCharges;
        }
    }
}
