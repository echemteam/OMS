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
        Task<GetApprovalConfigurationByApprovalConfigurationIdResponse> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId);
        Task<EntityList<GetApprovalConfigurationRulesResponse>> GetApprovalConfigurationRules(ListEntityRequest<BaseFilter> requestData);
        Task<EntityList<GetFunctionalitiesResponse>> GetFunctionalities(GetFunctionalitiesRequest requestData);
        Task<EntityList<GetFunctionalityEventsResponse>> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData);
        Task<AddEntityDTO<int>> AddFunctionalitiesResponsiblesUser(AddFunctionalitiesResponsiblesUserRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> DeleteFunctionalitiesResponsiblesUser(int functionalitiesResponsiblesId);
        Task<EntityList<GetFunctionalitiesResponsiblesResponse>> GetFunctionalitiesResponsibles(GetFunctionalitiesResponsiblesRequest requestData);
        Task<AddEntityDTO<int>> AddEditFunctionalities(AddEditFunctionalitiesRequest requestData);
    }
}
