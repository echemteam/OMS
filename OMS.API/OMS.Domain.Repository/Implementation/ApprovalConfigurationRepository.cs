using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApprovalConfigurationRepository : BaseRepository<ApprovalConfiguration>, IApprovalConfigurationRepository
    {
        #region SP Name
        const string ADDEDITAPPROVALCONFIGURATION = "AddEditApprovalConfiguration";
        const string GETAPPROVALCONFIGURATIONBYAPPROVALCONFIGURATIONID = "GetApprovalConfigurationByApprovalConfigurationId";
        const string GETAPPROVALCONFIGURATIONRULES = "GetApprovalConfigurationRules";
        const string GETFUNCTIONALITIES = "GetFunctionalities";
        const string GETFUNCTIONALITYEVENTS = "GetFunctionalityEvents";
        #endregion

        public ApprovalConfigurationRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Approval Configuration Repository
        public async Task<AddEntityDto<int>> AddEditApprovalConfiguration(ApprovalConfigurationDto addEditApprovalConfiguration)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITAPPROVALCONFIGURATION, new
            {
                addEditApprovalConfiguration.ApprovalConfigurationId,
                addEditApprovalConfiguration.RuleName,
                addEditApprovalConfiguration.ModuleId,
                addEditApprovalConfiguration.FunctionalityId,
                addEditApprovalConfiguration.FunctionalityEventId,
                addEditApprovalConfiguration.FunctionalitiesFieldId,
                addEditApprovalConfiguration.ApproverRoleId,
                addEditApprovalConfiguration.Template,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetApprovalConfigurationByApprovalConfigurationIdResponse> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId)
        {
            GetApprovalConfigurationByApprovalConfigurationIdResponse getApprovalConfigurationByApprovalConfigurationIdResponse = await _context.GetFrist<GetApprovalConfigurationByApprovalConfigurationIdResponse>(GETAPPROVALCONFIGURATIONBYAPPROVALCONFIGURATIONID, new
            {
                approvalConfigurationId
            }, CommandType.StoredProcedure);
            return getApprovalConfigurationByApprovalConfigurationIdResponse;
        }

        public async Task<EntityList<GetApprovalConfigurationRulesResponse>> GetApprovalConfigurationRules(GetApprovalConfigurationRulesRequest requestData)
        {
            return await _context.GetListSP<GetApprovalConfigurationRulesResponse>(GETAPPROVALCONFIGURATIONRULES, new
            {
                requestData.FunctionalityId,
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString,
            }, true);
        }
        public async Task<EntityList<GetFunctionalitiesResponse>> GetFunctionalities(GetFunctionalitiesRequest requestData)
        {
            return await _context.GetListSP<GetFunctionalitiesResponse>(GETFUNCTIONALITIES, new
            {
                requestData.ModuleId,
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString,
            }, true);
        }
        public async Task<EntityList<GetFunctionalityEventsResponse>> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData)
        {
            return await _context.GetListSP<GetFunctionalityEventsResponse>(GETFUNCTIONALITYEVENTS, new
            {
                requestData.FunctionalityId,
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString,
            }, true);
        }
        public async Task<AddEntityDto<int>> UpdateCustomerStatus(CustomersDto customers)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(GETFUNCTIONALITYEVENTS, new
            {
                customers.CustomerId,
                customers.StatusId,
                customers.UpdatedBy,
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
