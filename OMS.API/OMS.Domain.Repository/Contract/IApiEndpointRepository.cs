﻿using OMS.Domain.Entities.API.Request.ApiEndpoints;
using OMS.Domain.Entities.API.Response.ApiEndpoint;
using OMS.Domain.Entities.Entity.ApiEndpoint;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEndpointRepository
    {
        Task<AddEntityDto<int>> AddEditApiEndpoint(ApiEndpointDto apiEndpoint);
        Task<GetApiEndpointByEndpointIdResponse> GetApiEndpointByEndpointId(int endpointId);
        Task<AddEntityDto<int>> DeleteApiEndpoint(int endpointId, int deletedBy);
        Task<EntityList<GetApiEndpointsResponse>> GetApiEndpoints(GetApiEndpointsRequest requestData);

    }
}
