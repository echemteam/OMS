using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApiEndpoints;
using OMS.Domain.Entities.API.Response.ApiEndpoint;
using OMS.Domain.Entities.API.Response.ApiProvider;
using OMS.Domain.Entities.Entity.ApiEndpoint;
using OMS.Domain.Entities.Entity.ApiProvider;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.APIConfiguration
{
    public class ApiConfigurationService : BaseServices, IApiConfigurationService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public ApiConfigurationService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Approval Configuration Services
        public async Task<AddEntityDTO<int>> AddEditApiProvider(AddEditApiProviderRequest requestData, short CurrentUserId)
        {
            ApiProviderDTO apiProviderDTO = requestData.ToMapp<AddEditApiProviderRequest, ApiProviderDTO>();
            apiProviderDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.apiProvider.AddEditApiProvider(apiProviderDTO);
        }
        public Task<GetApiProviderByProviderIdResponse> GetApiProviderByProviderId(int providerId)
        {
            return repositoryManager.apiProvider.GetApiProviderByProviderId(providerId);
        }
        public async Task<AddEntityDTO<int>> DeleteApiProvider(int providerId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiProvider.DeleteApiProvider(providerId, deletedBy);
        }
        public async Task<EntityList<GetApiProvidersResponse>> GetApiProviders(ListEntityRequest<BaseFilter> requestData)
        {
            var apiProvidersDetails = await repositoryManager.apiProvider.GetApiProviders(requestData);
            return apiProvidersDetails!;
        }

        public async Task<AddEntityDTO<int>> AddEditApiEndpoint(AddEditApiEndpointRequest requestData, short CurrentUserId)
        {
            ApiEndpointDTO apiEndpointDTO = requestData.ToMapp<AddEditApiEndpointRequest, ApiEndpointDTO>();
            apiEndpointDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEndpoint.AddEditApiEndpoint(apiEndpointDTO);
        }

        public Task<GetApiEndpointByEndpointIdResponse> GetApiEndpointByEndpointId(int endpointId)
        {
            return repositoryManager.apiEndpoint.GetApiEndpointByEndpointId(endpointId);
        }
        public async Task<AddEntityDTO<int>> DeleteApiEndpoint(int endpointId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiEndpoint.DeleteApiEndpoint(endpointId, deletedBy);
        }
        public async Task<EntityList<GetApiEndpointsResponse>> GetApiEndpoints(ListEntityRequest<BaseFilter> requestData)
        {
            var endpointsDetails = await repositoryManager.apiEndpoint.GetApiEndpoints(requestData);
            return endpointsDetails!;
        }
        #endregion
    }
}
