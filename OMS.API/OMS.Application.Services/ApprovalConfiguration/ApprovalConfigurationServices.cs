using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Request.Functionalities;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.Functionalities;
using OMS.Domain.Entities.Entity.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Functionalities;
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
        public async Task<AddEntityDto<int>> AddEditApprovalConfiguration(AddEditApprovalConfigurationRequest requestData)
        {
            ApprovalConfigurationDto approvalConfigurationDto = requestData.ToMapp<AddEditApprovalConfigurationRequest, ApprovalConfigurationDto>();
            return await repositoryManager.approvalConfiguration.AddEditApprovalConfiguration(approvalConfigurationDto);
        }
        public Task<GetApprovalConfigurationByApprovalConfigurationIdResponse> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId)
        {
            return repositoryManager.approvalConfiguration.GetApprovalConfigurationByApprovalConfigurationId(approvalConfigurationId);
        }

        public Task<EntityList<GetApprovalConfigurationRulesResponse>> GetApprovalConfigurationRules(ListEntityRequest<BaseFilter> requestData)
        {
            return repositoryManager.approvalConfiguration.GetApprovalConfigurationRules(requestData);
        }

        public async Task<EntityList<GetFunctionalitiesResponse>> GetFunctionalities(GetFunctionalitiesRequest requestData)
        {
            return await repositoryManager.approvalConfiguration.GetFunctionalities(requestData);
        }
        public async Task<EntityList<GetFunctionalityEventsResponse>> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData)
        {
            return await repositoryManager.approvalConfiguration.GetFunctionalityEvents(requestData);
        }
        public async Task<AddEntityDto<int>> AddFunctionalitiesResponsiblesUser(AddFunctionalitiesResponsiblesUserRequest requestData, short CurrentUserId)
        {
            FunctionalitiesResponsiblesDto functionalitiesResponsiblesDto = requestData.ToMapp<AddFunctionalitiesResponsiblesUserRequest, FunctionalitiesResponsiblesDto>();
            return await repositoryManager.functionalities.AddFunctionalitiesResponsiblesUser(functionalitiesResponsiblesDto);
        }
        public async Task<AddEntityDto<int>> DeleteFunctionalitiesResponsiblesUser(int functionalitiesResponsiblesId)
        {
            return await repositoryManager.functionalities.DeleteFunctionalitiesResponsiblesUser(functionalitiesResponsiblesId);
        }
        public async Task<EntityList<GetFunctionalitiesResponsiblesResponse>> GetFunctionalitiesResponsibles(GetFunctionalitiesResponsiblesRequest requestData)
        {
            return await repositoryManager.functionalities.GetFunctionalitiesResponsibles(requestData);
        }
        public async Task<AddEntityDto<int>> AddEditFunctionalities(AddEditFunctionalitiesRequest requestData)
        {
            FunctionalitiesDto functionalitiesDto = requestData.ToMapp<AddEditFunctionalitiesRequest, FunctionalitiesDto>();
            return await repositoryManager.functionalities.AddEditFunctionalities(functionalitiesDto);
        }
        #endregion
    }
}
