using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.ApiAuthentication;
using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApiEndpoints;
using OMS.Domain.Entities.API.Request.ApiParameter;
using OMS.Domain.Entities.API.Response.ApiAuthentication;
using OMS.Domain.Entities.API.Response.ApiEndpoint;
using OMS.Domain.Entities.API.Response.ApiParameter;
using OMS.Domain.Entities.API.Response.ApiProvider;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ApiConfigurationController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public ApiConfigurationController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region API Configuration API
        [HttpPost("AddEditApiProvider")]
        public async Task<IActionResult> AddEditApiProvider(AddEditApiProviderRequest requestData)
        {
            var addEditItem = await _serviceManager.apiConfigurationService.AddEditApiProvider(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetApiProviderByProviderId")]
        public async Task<IActionResult> GetApiProviderByProviderId(int providerId)
        {
            if (providerId > 0)
            {
                GetApiProviderByProviderIdResponse responseData = await _serviceManager.apiConfigurationService.GetApiProviderByProviderId(providerId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(providerId);
        }

        [HttpDelete("DeleteApiProvider")]
        public async Task<IActionResult> DeleteApiProvider(int providerId)
        {
            if (providerId > 0)
            {
                var deleteItem = await _serviceManager.apiConfigurationService.DeleteApiProvider(providerId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(providerId);
        }
        [HttpPost("GetApiProviders")]
        public async Task<IActionResult> GetApiProviders([FromBody] ListEntityRequest<BaseFilter> requestData)
       {
            var providers = await _serviceManager.apiConfigurationService.GetApiProviders(requestData);
            return APISucessResponce<object>(providers);
        }

        [HttpPost("AddEditApiEndpoint")]
        public async Task<IActionResult> AddEditApiEndpoint(AddEditApiEndpointRequest requestData)
        {
            var addEditItem = await _serviceManager.apiConfigurationService.AddEditApiEndpoint(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }

        [HttpGet("GetApiEndpointByEndpointId")]
        public async Task<IActionResult> GetApiEndpointByEndpointId(int endpointId)
        {
            if (endpointId > 0)
            {
                GetApiEndpointByEndpointIdResponse responseData = await _serviceManager.apiConfigurationService.GetApiEndpointByEndpointId(endpointId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(endpointId);
        }


        [HttpDelete("DeleteApiEndpoint")]
        public async Task<IActionResult> DeleteApiEndpoint(int endpointId)
        {
            if (endpointId > 0)
            {
                var deleteItem = await _serviceManager.apiConfigurationService.DeleteApiEndpoint(endpointId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(endpointId);
        }

        [HttpPost("GetApiEndpoints")]
        public async Task<IActionResult> GetApiEndpoints(GetApiEndpointsRequest requestData)
        {
            var endpoint = await _serviceManager.apiConfigurationService.GetApiEndpoints(requestData);
            return APISucessResponce<object>(endpoint);
        }

        [HttpPost("AddEditApiParameter")]
        public async Task<IActionResult> AddEditApiParameter(AddEditApiParameterRequest requestData)
        {
            var addEditItem = await _serviceManager.apiConfigurationService.AddEditApiParameter(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }

        [HttpGet("GetApiParameterByParameterId")]
        public async Task<IActionResult> GetApiParameterByParameterId(int parameterId)
        {
            if (parameterId > 0)
            {
                GetApiParameterByParameterIdResponse responseData = await _serviceManager.apiConfigurationService.GetApiParameterByParameterId(parameterId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(parameterId);
        }


        [HttpDelete("DeleteApiParameter")]
        public async Task<IActionResult> DeleteApiParameter(int parameterId)
        {
            if (parameterId > 0)
            {
                var deleteItem = await _serviceManager.apiConfigurationService.DeleteApiParameter(parameterId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(parameterId);
        }

        [HttpPost("GetApiParameters")]
        public async Task<IActionResult> GetApiParameters(GetApiParametersRequest requestData)
        {
            var parameter = await _serviceManager.apiConfigurationService.GetApiParameters(requestData);
            return APISucessResponce<object>(parameter);
        }
        [HttpPost("AddEditApiAuthentication")]
        public async Task<IActionResult> AddEditApiAuthentication(AddEditApiAuthenticationRequest requestData)
        {
            var addEditItem = await _serviceManager.apiConfigurationService.AddEditApiAuthentication(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }

        [HttpGet("GetApiAuthenticationByAuthId")]
        public async Task<IActionResult> GetApiAuthenticationByAuthId(int authId)
        {
            if (authId > 0)
            {
                GetApiAuthenticationByAuthIdResponse responseData = await _serviceManager.apiConfigurationService.GetApiAuthenticationByAuthId(authId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(authId);
        }


        [HttpDelete("DeleteApiAuthentication")]
        public async Task<IActionResult> DeleteApiAuthentication(int authId)
        {
            if (authId > 0)
            {
                var deleteItem = await _serviceManager.apiConfigurationService.DeleteApiAuthentication(authId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(authId);
        }

        [HttpPost("GetApiAuthentications")]
        public async Task<IActionResult> GetApiAuthentications(GetApiAuthenticationsRequest requestData)
        {
            var authentication = await _serviceManager.apiConfigurationService.GetApiAuthentications(requestData);
            return APISucessResponce<object>(authentication);
        }

        [HttpGet("ApiTester")]
        public async Task<IActionResult> ApiTester(int apiEventId)
        {
            if (apiEventId > 0)
            {
                var item = await _serviceManager.apiConfigurationService.ApiTester(apiEventId).ConfigureAwait(true);
                return APISucessResponce<object>(item);
            }
            return APISucessResponce(apiEventId);
        }
        #endregion
    }
}
