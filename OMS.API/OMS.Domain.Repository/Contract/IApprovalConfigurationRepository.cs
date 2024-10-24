﻿using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApprovalConfiguration;
using OMS.Domain.Entities.API.Response.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.ApprovalConfiguration;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApprovalConfigurationRepository
    {
        Task<AddEntityDto<int>> AddEditApprovalConfiguration(ApprovalConfigurationDto addEditApprovalConfiguration);
        Task<GetApprovalConfigurationByApprovalConfigurationIdResponse> GetApprovalConfigurationByApprovalConfigurationId(int approvalConfigurationId);
        Task<EntityList<GetApprovalConfigurationRulesResponse>> GetApprovalConfigurationRules(GetApprovalConfigurationRulesRequest requestData);
        Task<EntityList<GetFunctionalitiesResponse>> GetFunctionalities(GetFunctionalitiesRequest requestData);
        Task<EntityList<GetFunctionalityEventsResponse>> GetFunctionalityEvents(GetFunctionalityEventsRequest requestData);
    }
}
