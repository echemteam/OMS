using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApiEndpoints;
using OMS.Domain.Entities.API.Response.ApiEndpoint;
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
        public async Task<IActionResult> GetApiEndpoints([FromBody] ListEntityRequest<BaseFilter> requestData)
        {
            var endpoint = await _serviceManager.apiConfigurationService.GetApiEndpoints(requestData);
            return APISucessResponce<object>(endpoint);
        }
        #endregion
    }
}
