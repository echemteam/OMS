﻿using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApiEndpoints;
using OMS.Domain.Entities.API.Response.ApiEndpoint;
using OMS.Domain.Entities.API.Response.ApiProvider;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.APIConfiguration
{
    public interface IApiConfigurationService
    {
        Task<AddEntityDTO<int>> AddEditApiProvider(AddEditApiProviderRequest requestData, short CurrentUserId);
        Task<GetApiProviderByProviderIdResponse> GetApiProviderByProviderId(int providerId);
        Task<AddEntityDTO<int>> DeleteApiProvider(int providerId, short CurrentUserId);
        Task<EntityList<GetApiProvidersResponse>> GetApiProviders(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDTO<int>> AddEditApiEndpoint(AddEditApiEndpointRequest requestData, short CurrentUserId);
        Task<GetApiEndpointByEndpointIdResponse> GetApiEndpointByEndpointId(int endpointId);
        Task<AddEntityDTO<int>> DeleteApiEndpoint(int endpointId, short CurrentUserId);
        Task<EntityList<GetApiEndpointsResponse>> GetApiEndpoints(ListEntityRequest<BaseFilter> requestData);
    }
}