using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.ApiAuthentication;
using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApiEndpoints;
using OMS.Domain.Entities.API.Request.ApiParameter;
using OMS.Domain.Entities.API.Response.ApiAuthentication;
using OMS.Domain.Entities.API.Response.ApiEndpoint;
using OMS.Domain.Entities.API.Response.ApiParameter;
using OMS.Domain.Entities.API.Response.ApiProvider;
using OMS.Domain.Entities.Entity.ApiAuthentication;
using OMS.Domain.Entities.Entity.ApiEndpoint;
using OMS.Domain.Entities.Entity.ApiParameter;
using OMS.Domain.Entities.Entity.ApiProvider;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;
using ThirdPartyAPIClientLibrary;

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
        public async Task<AddEntityDto<int>> AddEditApiProvider(AddEditApiProviderRequest requestData, short CurrentUserId)
        {
            ApiProviderDto apiProviderDto = requestData.ToMapp<AddEditApiProviderRequest, ApiProviderDto>();
            apiProviderDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiProvider.AddEditApiProvider(apiProviderDto);
        }
        public Task<GetApiProviderByProviderIdResponse> GetApiProviderByProviderId(int providerId)
        {
            return repositoryManager.apiProvider.GetApiProviderByProviderId(providerId);
        }
        public async Task<AddEntityDto<int>> DeleteApiProvider(int providerId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiProvider.DeleteApiProvider(providerId, deletedBy);
        }
        public async Task<EntityList<GetApiProvidersResponse>> GetApiProviders(ListEntityRequest<BaseFilter> requestData)
        {
            var apiProvidersDetails = await repositoryManager.apiProvider.GetApiProviders(requestData);
            return apiProvidersDetails!;
        }

        public async Task<AddEntityDto<int>> AddEditApiEndpoint(AddEditApiEndpointRequest requestData, short CurrentUserId)
        {
            ApiEndpointDto apiEndpointDto = requestData.ToMapp<AddEditApiEndpointRequest, ApiEndpointDto>();
            apiEndpointDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEndpoint.AddEditApiEndpoint(apiEndpointDto);
        }

        public Task<GetApiEndpointByEndpointIdResponse> GetApiEndpointByEndpointId(int endpointId)
        {
            return repositoryManager.apiEndpoint.GetApiEndpointByEndpointId(endpointId);
        }
        public async Task<AddEntityDto<int>> DeleteApiEndpoint(int endpointId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiEndpoint.DeleteApiEndpoint(endpointId, deletedBy);
        }
        public async Task<EntityList<GetApiEndpointsResponse>> GetApiEndpoints(GetApiEndpointsRequest requestData)
        {
            var endpointsDetails = await repositoryManager.apiEndpoint.GetApiEndpoints(requestData);
            return endpointsDetails!;
        }

        public async Task<AddEntityDto<int>> AddEditApiParameter(AddEditApiParameterRequest requestData, short CurrentUserId)
        {
            ApiParameterDto apiParameterDto = requestData.ToMapp<AddEditApiParameterRequest, ApiParameterDto>();
            apiParameterDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiParameter.AddEditApiParameter(apiParameterDto);
        }
        public Task<GetApiParameterByParameterIdResponse> GetApiParameterByParameterId(int parameterId)
        {
            return repositoryManager.apiParameter.GetApiParameterByParameterId(parameterId);
        }
        public async Task<AddEntityDto<int>> DeleteApiParameter(int parameterId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiParameter.DeleteApiParameter(parameterId, deletedBy);
        }
        public async Task<EntityList<GetApiParametersResponse>> GetApiParameters(GetApiParametersRequest requestData)
        {
            var parametersDetails = await repositoryManager.apiParameter.GetApiParameters(requestData);
            return parametersDetails!;
        }
        public async Task<AddEntityDto<int>> AddEditApiAuthentication(AddEditApiAuthenticationRequest requestData, short CurrentUserId)
        {
            ApiAuthenticationDto apiAuthenticationDto = requestData.ToMapp<AddEditApiAuthenticationRequest, ApiAuthenticationDto>();
            apiAuthenticationDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiAuthentication.AddEditApiAuthentication(apiAuthenticationDto);
        }
        public Task<GetApiAuthenticationByAuthIdResponse> GetApiAuthenticationByAuthId(int authId)
        {
            return repositoryManager.apiAuthentication.GetApiAuthenticationByAuthId(authId);
        }
        public async Task<AddEntityDto<int>> DeleteApiAuthentication(int authId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiAuthentication.DeleteApiAuthentication(authId, deletedBy);
        }
        public async Task<EntityList<GetApiAuthenticationsResponse>> GetApiAuthentications(GetApiAuthenticationsRequest requestData)
        {
            var parametersDetails = await repositoryManager.apiAuthentication.GetApiAuthentications(requestData);
            return parametersDetails!;
        }
        public async Task<ApiTesterResponse> ThirdPartyAPICall(int apiEventId)
        {
            ApiTesterResponse responsData = new();
            responsData.ApiResponse = await ThirdPartyAPIIntegrator.GetThirdPartyApiResponse(apiEventId);

            return responsData;
        }
        #endregion
    }
}
