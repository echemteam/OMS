using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApprovalConfigurationRepository
    {
        Task<AddEntityDTO<int>> AddEditApprovalConfiguration(ApprovalConfigurationDTO addEditApprovalConfiguration);
        Task<GetApprovalConfigurationByApprovalConfigurationIdResponse> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId);
        Task<EntityList<GetApprovalConfigurationRulesResponse>> GetApprovalConfigurationRules(ListEntityRequest<BaseFilter> requestData);
        Task<EntityList<GetFunctionalitiesResponse>> GetFunctionalities(GetFunctionalitiesRequest requestData);
        Task<EntityList<GetFunctionalityEventsResponse>> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData);
    }
}
