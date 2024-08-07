using OMS.Domain.Entities.API.Request.ApiAuthentication;
using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApiEndpoints;
using OMS.Domain.Entities.API.Request.ApiParameter;
using OMS.Domain.Entities.API.Response.ApiAuthentication;
using OMS.Domain.Entities.API.Response.ApiEndpoint;
using OMS.Domain.Entities.API.Response.ApiParameter;
using OMS.Domain.Entities.API.Response.ApiProvider;
using OMS.Domain.Entities.Entity.ApiAuthentication;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.APIConfiguration
{
    public interface IApiConfigurationService
    {
        Task<AddEntityDto<int>> AddEditApiProvider(AddEditApiProviderRequest requestData, short CurrentUserId);
        Task<GetApiProviderByProviderIdResponse> GetApiProviderByProviderId(int providerId);
        Task<AddEntityDto<int>> DeleteApiProvider(int providerId, short CurrentUserId);
        Task<EntityList<GetApiProvidersResponse>> GetApiProviders(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDto<int>> AddEditApiEndpoint(AddEditApiEndpointRequest requestData, short CurrentUserId);
        Task<GetApiEndpointByEndpointIdResponse> GetApiEndpointByEndpointId(int endpointId);
        Task<AddEntityDto<int>> DeleteApiEndpoint(int endpointId, short CurrentUserId);
        Task<EntityList<GetApiEndpointsResponse>> GetApiEndpoints(GetApiEndpointsRequest requestData);
        Task<AddEntityDto<int>> AddEditApiParameter(AddEditApiParameterRequest requestData, short CurrentUserId);
        Task<GetApiParameterByParameterIdResponse> GetApiParameterByParameterId(int parameterId);
        Task<AddEntityDto<int>> DeleteApiParameter(int parameterId, short CurrentUserId);
        Task<EntityList<GetApiParametersResponse>> GetApiParameters(GetApiParametersRequest requestData);
        Task<AddEntityDto<int>> AddEditApiAuthentication(AddEditApiAuthenticationRequest requestData, short CurrentUserId);
        Task<GetApiAuthenticationByAuthIdResponse> GetApiAuthenticationByAuthId(int authId);
        Task<AddEntityDto<int>> DeleteApiAuthentication(int authId, short CurrentUserId);
        Task<EntityList<GetApiAuthenticationsResponse>> GetApiAuthentications(GetApiAuthenticationsRequest requestData);
        Task<ApiTesterResponse> ApiTester(int providerId);
    }
}
