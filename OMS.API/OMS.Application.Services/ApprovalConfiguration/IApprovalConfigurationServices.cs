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
        Task<AddEntityDto<int>> AddEditApprovalConfiguration(AddEditApprovalConfigurationRequest requestData);
        Task<GetApprovalConfigurationByApprovalConfigurationIdResponse> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId);
        Task<EntityList<GetApprovalConfigurationRulesResponse>> GetApprovalConfigurationRules(GetApprovalConfigurationRulesRequest requestData);
        Task<EntityList<GetFunctionalitiesResponse>> GetFunctionalities(GetFunctionalitiesRequest requestData);
        Task<EntityList<GetFunctionalityEventsResponse>> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData);
        Task<AddEntityDto<int>> AddFunctionalitiesResponsiblesUser(AddFunctionalitiesResponsiblesUserRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> DeleteFunctionalitiesResponsiblesUser(int functionalitiesResponsiblesId);
        Task<EntityList<GetFunctionalitiesResponsiblesResponse>> GetFunctionalitiesResponsibles(GetFunctionalitiesResponsiblesRequest requestData);
        Task<AddEntityDto<int>> AddEditFunctionalities(AddEditFunctionalitiesRequest requestData);
    }
}
