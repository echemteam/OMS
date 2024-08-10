using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.ApiEvent;
using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Request.ApiEventParameter;
using OMS.Domain.Entities.API.Request.ApiEventRequiredField;
using OMS.Domain.Entities.API.Request.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Request.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.API.Response.ApiEventRequiredField;
using OMS.Domain.Entities.API.Response.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
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
            return APISucessResponce(apiEventMapping);
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


        //------------------ ------------------ ------------------ ------------------ ------------------ ------------------ ------------------ ------------------ //

        [HttpPost("AddEditApiEventParameter")]
        public async Task<IActionResult> AddEditApiEventParameter(AddEditApiEventParameterRequest requestData)
        {
            var addEditItem = await _serviceManager.apiEventManagementService.AddEditApiEventParameter(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetApiEventParameterByApiEventParametersId")]
        public async Task<IActionResult> GetApiEventParameterByApiEventParametersId(int apiEventId)
        {
            if (apiEventId > 0)
            {
                GetApiEventParameterByApiEventParametersIdResponse responseData = await _serviceManager.apiEventManagementService.GetApiEventParameterByApiEventParametersId(apiEventId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(apiEventId);
        }

        [HttpDelete("DeleteApiEventParameter")]
        public async Task<IActionResult> DeleteApiEventParameter(int parameterId,int apiEventParametersId)
        {
            if (parameterId > 0 && apiEventParametersId > 0)
            {
                var deleteItem = await _serviceManager.apiEventManagementService.DeleteApiEventParameter(parameterId, apiEventParametersId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(parameterId);
        }

        [HttpPost("GetApiEventParameters")]
        public async Task<IActionResult> GetApiEventParameters(GetApiEventParametersRequest requestData)
        {
            var apiEventParameters = await _serviceManager.apiEventManagementService.GetApiEventParameters(requestData);
            return APISucessResponce<object>(apiEventParameters);
        }

        //------------------ ------------------ ------------------ ------------------ ------------------ ------------------ ------------------ ------------------ //


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
        [HttpPost("AddEditApiEventRequiredField")]
        public async Task<IActionResult> AddEditApiEventRequiredField(AddEditApiEventRequiredFieldRequest requestData)
        {
            var addEditItem = await _serviceManager.apiEventManagementService.AddEditApiEventRequiredField(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }
        [HttpGet("GetApiEventRequiredFieldByApiEventRequiredFieldId")]
        public async Task<IActionResult> GetApiEventRequiredFieldByApiEventRequiredFieldId(int apiEventRequiredFieldId)
        {
            if (apiEventRequiredFieldId > 0)
            {
                GetApiEventRequiredFieldByApiEventRequiredFieldIdResponse responseData = await _serviceManager.apiEventManagementService.GetApiEventRequiredFieldByApiEventRequiredFieldId(apiEventRequiredFieldId).ConfigureAwait(true);
                return APISucessResponce(responseData);
            }
            return APISucessResponce(apiEventRequiredFieldId);
        }


        [HttpDelete("DeleteApiEventRequiredField")]
        public async Task<IActionResult> DeleteApiEventRequiredField(int apiEventRequiredFieldId)
        {
            if (apiEventRequiredFieldId > 0)
            {
                var deleteItem = await _serviceManager.apiEventManagementService.DeleteApiEventRequiredField(apiEventRequiredFieldId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(apiEventRequiredFieldId);
        }
        [HttpPost("GetApiEventRequiredFields")]
        public async Task<IActionResult> GetApiEventRequiredFields(GetApiEventRequiredFieldsRequest requestData)
        {
            var apiEventRequiredFields = await _serviceManager.apiEventManagementService.GetApiEventRequiredFields(requestData);
            return APISucessResponce<object>(apiEventRequiredFields);
        }

        [HttpPost("AddApiEventRequiredFieldsMapping")]
        public async Task<IActionResult> AddApiEventRequiredFieldsMapping(AddApiEventRequiredFieldsMappingRequest requestData)
        {
            var addItem = await _serviceManager.apiEventManagementService.AddApiEventRequiredFieldsMapping(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("GetApiEventRequiredFieldsMappings")]
        public async Task<IActionResult> GetApiEventRequiredFieldsMappings(GetApiEventRequiredFieldsMappingsRequest requestData)
        {
            var apiEventRequiredFieldsMappings = await _serviceManager.apiEventManagementService.GetApiEventRequiredFieldsMappings(requestData);
            return APISucessResponce<object>(apiEventRequiredFieldsMappings);
        }
        [HttpDelete("DeleteApiEventRequiredFieldsMapping")]
        public async Task<IActionResult> DeleteApiEventRequiredFieldsMapping(int apiEventRequiredFieldsMappingId)
        {
            if (apiEventRequiredFieldsMappingId > 0)
            {
                var deleteItem = await _serviceManager.apiEventManagementService.DeleteApiEventRequiredFieldsMapping(apiEventRequiredFieldsMappingId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(apiEventRequiredFieldsMappingId);
        }

        [HttpGet("GetAllAPIParametersByEndpointId")]
        public async Task<IActionResult> GetAllAPIParametersByEndpointId(int endpointId)
        {
            List<GetAllAPIParametersResponse> responseData = await _serviceManager.apiEventManagementService.GetAllAPIParametersByEndpointId(endpointId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllRequiredFieldsByEventId")]
        public async Task<IActionResult> GetAllRequiredFieldsByEventId(int apiEventId)
        {
            List<GetAllRequiredFieldsResponse> responseData = await _serviceManager.apiEventManagementService.GetAllRequiredFieldsByEventId(apiEventId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllEventParameterByEventId")]
        public async Task<IActionResult> GetAllEventParameterByEventId(int apiEventId)
        {
            List<GetAllEventParameterResponse> responseData = await _serviceManager.apiEventManagementService.GetAllEventParameterByEventId(apiEventId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        #endregion
    }
}
