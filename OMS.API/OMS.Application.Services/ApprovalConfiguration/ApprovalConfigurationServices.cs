using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.ApprovalConfiguration
{
    public class ApprovalConfigurationServices : BaseServices, IApprovalConfigurationServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public ApprovalConfigurationServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Approval Configuration Services
        public async Task<AddEntityDTO<int>> AddEditApprovalConfiguration(AddEditApprovalConfigurationRequest requestData)
        {
            ApprovalConfigurationDTO approvalConfigurationDTO = requestData.ToMapp<AddEditApprovalConfigurationRequest, ApprovalConfigurationDTO>();
            return await repositoryManager.approvalConfiguration.AddEditApprovalConfiguration(approvalConfigurationDTO);
        }
        public Task<List<GetApprovalConfigurationByApprovalConfigurationIdResponse>> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId)
        {
            return repositoryManager.approvalConfiguration.GetApprovalConfigurationByApprovalConfigurationId(approvalConfigurationId);
        }

        public Task<List<GetApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse>> GetApprovalConfigurationRulesByModuleIdAndFunctionalityId(int moduleId, int functionalityId)
        {
            return repositoryManager.approvalConfiguration.GetApprovalConfigurationRulesByModuleIdAndFunctionalityId(moduleId, functionalityId);
        }

        public async Task<EntityList<GetFunctionalitiesResponse>> GetFunctionalities(GetFunctionalitiesRequest requestData)
        {
            return await repositoryManager.approvalConfiguration.GetFunctionalities(requestData);
        }
        public async Task<EntityList<GetFunctionalityEventsResponse>> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData)
        {
            return await repositoryManager.approvalConfiguration.GetFunctionalityEvents(requestData);
        }
        #endregion
    }
}
