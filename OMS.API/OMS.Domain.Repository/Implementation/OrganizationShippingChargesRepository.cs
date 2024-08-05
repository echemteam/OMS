using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationShippingChargesRepository : BaseRepository<OrganizationShippingCharges>, IOrganizationShippingChargesRepository
    {
        const string ADDEDITORGANIZATIONSHIPPINGCHARGES = "AddEditOrganizationShippingCharges";
        const string GETORGANIZATIONSHIPPINGCHARGES = "GetOrganizationShippingCharges";
        public OrganizationShippingChargesRepository(DapperContext dapperContext) : base(dapperContext)
        {

        }
        public async Task<AddEntityDTO<int>> AddEditOrganizationShippingCharges(OrganizationShippingChargesDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITORGANIZATIONSHIPPINGCHARGES, new
            {
                requestData.OrganizationShippingChargeId,
                requestData.DomesticOvernight,
                requestData.DomesticSecondDay,
                requestData.DomesticGround,
                requestData.InternationalPriority,
                requestData.InternationalEconomy,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationShippingChargesResponse> GetOrganizationShippingCharges()
        {
            GetOrganizationShippingChargesResponse organizationShippingCharges = await _context.GetFrist<GetOrganizationShippingChargesResponse>(GETORGANIZATIONSHIPPINGCHARGES, CommandType.StoredProcedure);
            return organizationShippingCharges;
        }
    }
}
