using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.ApprovalConfiguration
{
    public interface IApprovalConfigurationServices
    {
        Task<AddEntityDTO<int>> AddEditApprovalConfiguration(AddEditApprovalConfigurationRequest requestData);
        Task<List<GetApprovalConfigurationByApprovalConfigurationIdResponse>> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId);
        Task<List<GetApprovalConfigurationRulesByModuleIdAndFunctionalityIdResponse>> GetApprovalConfigurationRulesByModuleIdAndFunctionalityId(int moduleId, int functionalityId);
    }
}
