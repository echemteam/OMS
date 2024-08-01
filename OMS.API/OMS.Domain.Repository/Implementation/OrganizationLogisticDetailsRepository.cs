using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationLogisticDetailsRepository : BaseRepository<OrganizationLogisticDetails>, IOrganizationLogisticDetailsRepository
    {
        const string GETORGANIZATIONLOGISTICDETAILS = "GetOrganizationLogisticDetails";
        const string ADDEDITORGANIZATIONALOGISTICDETAILS = "AddEditOrganizationalLogisticDetails";
        public OrganizationLogisticDetailsRepository(DapperContext dapperContext) : base(dapperContext)
        {

        }
        public async Task<AddEntityDTO<int>> AddEditOrganizationLogisticDetails(OrganizationLogisticDetailsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITORGANIZATIONALOGISTICDETAILS, new
            {
                requestData.OrganizationLogisticDetailId,
                requestData.FedExAccount,
                requestData.DHLAccount,
                requestData.UPSAccount,
                requestData.USPSAccount,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationLogisticDetailsResponse> GetOrganizationLogisticDetails()
        {
            GetOrganizationLogisticDetailsResponse organizationLogisticDetails = await _context.GetFrist<GetOrganizationLogisticDetailsResponse>(GETORGANIZATIONLOGISTICDETAILS, CommandType.StoredProcedure);
            return organizationLogisticDetails;
        }
    }
}
