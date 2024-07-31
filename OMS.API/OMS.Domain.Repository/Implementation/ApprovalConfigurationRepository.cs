using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.CommonEntity;
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
        const string GETAPPROVALCONFIGURATIONRULESBYMODULEIDANDFUNCTIONALITYID = "GetApprovalConfigurationRulesByModuleIdAndFunctionalityId";
        const string GETFUNCTIONALITIES = "GetFunctionalities";
        const string GETFUNCTIONALITYEVENTS = "GetFunctionalityEvents";
        #endregion

        public ApprovalConfigurationRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Approval Configuration Repository
        public async Task<AddEntityDTO<int>> AddEditApprovalConfiguration(ApprovalConfigurationDTO addEditApprovalConfiguration)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITAPPROVALCONFIGURATION, new
            {
                addEditApprovalConfiguration.ApprovalConfigurationId,
                addEditApprovalConfiguration.RuleName,
                addEditApprovalConfiguration.ModuleId,
                addEditApprovalConfiguration.FunctionalityId,
                addEditApprovalConfiguration.FunctionalitiesFieldId,
                addEditApprovalConfiguration.ApproverRoleId,
                addEditApprovalConfiguration.ApprovalAction
            }, CommandType.StoredProcedure);
        }
        public async Task<List<GetApprovalConfigurationByApprovalConfigurationIdResponse>> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId)
        {
            List<GetApprovalConfigurationByApprovalConfigurationIdResponse> getApprovalConfigurationByApprovalConfigurationIdResponse = await _context.GetList<GetApprovalConfigurationByApprovalConfigurationIdResponse>(GETAPPROVALCONFIGURATIONBYAPPROVALCONFIGURATIONID, new
            {
                approvalConfigurationId
            }, CommandType.StoredProcedure);
            return getApprovalConfigurationByApprovalConfigurationIdResponse;
        }

        public async Task<List<GetApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse>> GetApprovalConfigurationRulesByModuleIdAndFunctionalityId(int moduleId, int functionalityId)
        {
            List<GetApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse> getApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse = await _context.GetList<GetApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse>(GETAPPROVALCONFIGURATIONRULESBYMODULEIDANDFUNCTIONALITYID, new
            {
                moduleId,
                functionalityId
            }, CommandType.StoredProcedure);
            return getApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse;
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
        #endregion
    }
}
