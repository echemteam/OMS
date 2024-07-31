using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Request.Functionalities;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.Functionalities;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.ApprovalConfiguration
{
    public interface IApprovalConfigurationServices
    {
        Task<AddEntityDTO<int>> AddEditApprovalConfiguration(AddEditApprovalConfigurationRequest requestData);
        Task<List<GetApprovalConfigurationByApprovalConfigurationIdResponse>> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId);
        Task<List<GetApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse>> GetApprovalConfigurationRulesByModuleIdAndFunctionalityId(int moduleId, int functionalityId);
        Task<EntityList<GetFunctionalitiesResponse>> GetFunctionalities(GetFunctionalitiesRequest requestData);
        Task<EntityList<GetFunctionalityEventsResponse>> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData);
        Task<AddEntityDTO<int>> AddFunctionalitiesResponsiblesUser(AddFunctionalitiesResponsiblesUserRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> DeleteFunctionalitiesResponsiblesUser(int functionalitiesResponsiblesId);
        Task<EntityList<GetFunctionalitiesResponsiblesResponse>> GetFunctionalitiesResponsibles(GetFunctionalitiesResponsiblesRequest requestData);
    }
}
