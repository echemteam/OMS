using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.ApiEvent;
using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Request.ApiEventParameter;
using OMS.Domain.Entities.API.Request.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ApiEventManagementController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public ApiEventManagementController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion
        #region Api Event Management API
        [HttpPost("AddEditApiEvent")]
        public async Task<IActionResult> AddEditApiEvent(AddEditApiEventRequest requestData)
        {
            var addEditItem = await _serviceManager.apiEventManagementService.AddEditApiEvent(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetApiEventByApiEventId")]
        public async Task<IActionResult> GetApiEventByApiEventId(int apiEventId)
        {
            if (apiEventId > 0)
            {
                GetApiEventByApiEventIdResponse responseData = await _serviceManager.apiEventManagementService.GetApiEventByApiEventId(apiEventId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(apiEventId);
        }


        [HttpDelete("DeleteApiEvent")]
        public async Task<IActionResult> DeleteApiEvent(int apiEventId)
        {
            if (apiEventId > 0)
            {
                var deleteItem = await _serviceManager.apiEventManagementService.DeleteApiEvent(apiEventId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(apiEventId);
        }
        [HttpPost("GetApiEvents")]
        public async Task<IActionResult> GetApiEvents([FromBody] ListEntityRequest<BaseFilter> requestData)
        {
            var apiEvents = await _serviceManager.apiEventManagementService.GetApiEvents(requestData);
            return APISucessResponce<object>(apiEvents);
        }

        [HttpPost("AddApiEventMapping")]
        public async Task<IActionResult> AddApiEventMapping(AddApiEventMappingRequest requestData)
        {
            var addItem = await _serviceManager.apiEventManagementService.AddApiEventMapping(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("GetApiEventMappings")]
        public async Task<IActionResult> GetApiEventMappings(GetApiEventMappingsRequest requestData)
        {
            var apiEventMapping = await _serviceManager.apiEventManagementService.GetApiEventMappings(requestData);
            return APISucessResponce<object>(apiEventMapping);
        }
        [HttpDelete("DeleteApiEventMapping")]
        public async Task<IActionResult> DeleteApiEventMapping(int apiEventMappingId)
        {
            if (apiEventMappingId > 0)
            {
                var deleteItem = await _serviceManager.apiEventManagementService.DeleteApiEventMapping(apiEventMappingId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(apiEventMappingId);
        }

        [HttpPost("AddEditApiEventParameter")]
        public async Task<IActionResult> AddEditApiEventParameter(AddEditApiEventParameterRequest requestData)
        {
            var addEditItem = await _serviceManager.apiEventManagementService.AddEditApiEventParameter(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetApiEventParameterByApiEventParametersId")]
        public async Task<IActionResult> GetApiEventParameterByApiEventParametersId(int apiEventParametersId)
        {
            if (apiEventParametersId > 0)
            {
                GetApiEventParameterByApiEventParametersIdResponse responseData = await _serviceManager.apiEventManagementService.GetApiEventParameterByApiEventParametersId(apiEventParametersId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(apiEventParametersId);
        }


        [HttpDelete("DeleteApiEventParameter")]
        public async Task<IActionResult> DeleteApiEventParameter(int apiEventParametersId)
        {
            if (apiEventParametersId > 0)
            {
                var deleteItem = await _serviceManager.apiEventManagementService.DeleteApiEventParameter(apiEventParametersId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(apiEventParametersId);
        }
        [HttpPost("GetApiEventParameters")]
        public async Task<IActionResult> GetApiEventParameters(GetApiEventParametersRequest requestData)
        {
            var apiEventParameters = await _serviceManager.apiEventManagementService.GetApiEventParameters(requestData);
            return APISucessResponce<object>(apiEventParameters);
        }


        [HttpPost("AddApiParameterMapping")]
        public async Task<IActionResult> AddApiParameterMapping(AddApiParameterMappingRequest requestData)
        {
            var addItem = await _serviceManager.apiEventManagementService.AddApiParameterMapping(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("GetApiParameterMappings")]
        public async Task<IActionResult> GetApiParameterMappings(GetApiParameterMappingsRequest requestData)
        {
            var apiParameterMapping = await _serviceManager.apiEventManagementService.GetApiParameterMappings(requestData);
            return APISucessResponce<object>(apiParameterMapping);
        }
        [HttpDelete("DeleteApiParameterMapping")]
        public async Task<IActionResult> DeleteApiParameterMapping(int apiParameterMappingId)
        {
            if (apiParameterMappingId > 0)
            {
                var deleteItem = await _serviceManager.apiEventManagementService.DeleteApiParameterMapping(apiParameterMappingId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(apiParameterMappingId);
        }
        #endregion
    }
}
