using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.ApiEvent;
using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Request.ApiEventParameter;
using OMS.Domain.Entities.API.Request.ApiEventRequiredField;
using OMS.Domain.Entities.API.Request.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Request.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.API.Response.ApiEventMapping;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.API.Response.ApiEventRequiredField;
using OMS.Domain.Entities.API.Response.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Response.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Entities.Entity.ApiEvent;
using OMS.Domain.Entities.Entity.ApiEventMapping;
using OMS.Domain.Entities.Entity.ApiEventParameter;
using OMS.Domain.Entities.Entity.ApiEventRequiredField;
using OMS.Domain.Entities.Entity.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.Entity.ApiParameterMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.ApiEventManagement
{
    public class ApiEventManagementService : BaseServices, IApiEventManagementService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public ApiEventManagementService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Api Event Management Service
        public async Task<AddEntityDto<int>> AddEditApiEvent(AddEditApiEventRequest requestData, short CurrentUserId)
        {
            ApiEventDto apiEventDto = requestData.ToMapp<AddEditApiEventRequest, ApiEventDto>();
            apiEventDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEvent.AddEditApiEvent(apiEventDto);
        }
        public Task<GetApiEventByApiEventIdResponse> GetApiEventByApiEventId(int apiEventId)
        {
            return repositoryManager.apiEvent.GetApiEventByApiEventId(apiEventId);
        }
        public async Task<AddEntityDto<int>> DeleteApiEvent(int apiEventId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiEvent.DeleteApiEvent(apiEventId, deletedBy);
        }
        public async Task<EntityList<GetApiEventsResponse>> GetApiEvents(ListEntityRequest<BaseFilter> requestData)
        {
            var apiEventsDetails = await repositoryManager.apiEvent.GetApiEvents(requestData);
            return apiEventsDetails!;
        }

        public async Task<AddEntityDto<int>> AddApiEventMapping(AddApiEventMappingRequest requestData, short CurrentUserId)
        {
            ApiEventMappingDto apiEventMappingDto = requestData.ToMapp<AddApiEventMappingRequest, ApiEventMappingDto>();
            apiEventMappingDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEventMapping.AddApiEventMapping(apiEventMappingDto);
        }
        public async Task<GetApiEventMappingsResponse> GetApiEventMappings(GetApiEventMappingsRequest requestData)
        {
            var apiEventMappingsDetails = await repositoryManager.apiEventMapping.GetApiEventMappings(requestData);
            return apiEventMappingsDetails!;
        }
        public async Task<AddEntityDto<int>> DeleteApiEventMapping(int apiEventMappingId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiEventMapping.DeleteApiEventMapping(apiEventMappingId, deletedBy);
        }
        public async Task<AddEntityDto<int>> AddEditApiEventParameter(AddEditApiEventParameterRequest requestData, short CurrentUserId)
        {
            ApiEventParameterDto apiEventParameterDto = requestData.ToMapp<AddEditApiEventParameterRequest, ApiEventParameterDto>();
            apiEventParameterDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEventParameter.AddEditApiEventParameter(apiEventParameterDto);
        }
        public Task<GetApiEventParameterByApiEventParametersIdResponse> GetApiEventParameterByApiEventParametersId(int apiEventId)
        {
            return repositoryManager.apiEventParameter.GetApiEventParameterByApiEventParametersId(apiEventId);  
        }

        public async Task<AddEntityDto<int>> DeleteApiEventParameter(int parameterId, int apiEventParametersId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiEventParameter.DeleteApiEventParameter(parameterId, apiEventParametersId, deletedBy);
        }
        public async Task<EntityList<GetApiEventParametersResponse>> GetApiEventParameters(GetApiEventParametersRequest requestData)
        {
            var apiEventParametersDetails = await repositoryManager.apiEventParameter.GetApiEventParameters(requestData);
            return apiEventParametersDetails!;
        }
        public async Task<AddEntityDto<int>> AddApiParameterMapping(AddApiParameterMappingRequest requestData, short CurrentUserId)
        {
            ApiParameterMappingDto apiParameterMappingDto = requestData.ToMapp<AddApiParameterMappingRequest, ApiParameterMappingDto>();
            apiParameterMappingDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiParameterMapping.AddApiParameterMapping(apiParameterMappingDto);
        }
        public async Task<EntityList<GetApiParameterMappingsResponse>> GetApiParameterMappings(GetApiParameterMappingsRequest requestData)
        {
            var apiParameterMappingDetails = await repositoryManager.apiParameterMapping.GetApiParameterMappings(requestData);
            return apiParameterMappingDetails!;
        }
        public async Task<AddEntityDto<int>> DeleteApiParameterMapping(int apiParameterMappingId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiParameterMapping.DeleteApiParameterMapping(apiParameterMappingId, deletedBy);
        }

        public async Task<AddEntityDto<int>> AddEditApiEventRequiredField(AddEditApiEventRequiredFieldRequest requestData, short CurrentUserId)
        {
            ApiEventRequiredFieldDto apiEventRequiredFieldDto = requestData.ToMapp<AddEditApiEventRequiredFieldRequest, ApiEventRequiredFieldDto>();
            apiEventRequiredFieldDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEventRequiredField.AddEditApiEventRequiredField(apiEventRequiredFieldDto);
        }
        public Task<GetApiEventRequiredFieldByApiEventRequiredFieldIdResponse> GetApiEventRequiredFieldByApiEventRequiredFieldId(int apiEventRequiredFieldId)
        {
            return repositoryManager.apiEventRequiredField.GetApiEventRequiredFieldByApiEventRequiredFieldId(apiEventRequiredFieldId);
        }
        public async Task<AddEntityDto<int>> DeleteApiEventRequiredField(int apiEventRequiredFieldId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiEventRequiredField.DeleteApiEventRequiredField(apiEventRequiredFieldId, deletedBy);
        }
        public async Task<EntityList<GetApiEventRequiredFieldsResponse>> GetApiEventRequiredFields(GetApiEventRequiredFieldsRequest requestData)
        {
            var apiEventRequiredFieldsDetails = await repositoryManager.apiEventRequiredField.GetApiEventRequiredFields(requestData);
            return apiEventRequiredFieldsDetails!;
        }
        public async Task<AddEntityDto<int>> AddApiEventRequiredFieldsMapping(AddApiEventRequiredFieldsMappingRequest requestData, short CurrentUserId)
        {
            ApiEventRequiredFieldsDto apiEventRequiredFieldsDto = requestData.ToMapp<AddApiEventRequiredFieldsMappingRequest, ApiEventRequiredFieldsDto>();
            apiEventRequiredFieldsDto.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEventRequiredFieldsMapping.AddApiEventRequiredFieldsMapping(apiEventRequiredFieldsDto);
        }
        public async Task<EntityList<GetApiEventRequiredFieldsMappingsResponse>> GetApiEventRequiredFieldsMappings(GetApiEventRequiredFieldsMappingsRequest requestData)
        {
            var apiParameterMappingDetails = await repositoryManager.apiEventRequiredFieldsMapping.GetApiEventRequiredFieldsMappings(requestData);
            return apiParameterMappingDetails!;
        }
        public async Task<AddEntityDto<int>> DeleteApiEventRequiredFieldsMapping(int apiEventRequiredFieldsMappingId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiEventRequiredFieldsMapping.DeleteApiEventRequiredFieldsMapping(apiEventRequiredFieldsMappingId, deletedBy);
        }
        public Task<List<GetAllAPIParametersResponse>> GetAllAPIParametersByEndpointId(int endpointId)
        {
            return repositoryManager.apiEventRequiredFieldsMapping.GetAllAPIParametersByEndpointId(endpointId);
        }

        public Task<List<GetAllRequiredFieldsResponse>> GetAllRequiredFieldsByEventId(int apiEventId)
        {
            return repositoryManager.apiEventRequiredFieldsMapping.GetAllRequiredFieldsByEventId(apiEventId);
        }

        public Task<List<GetAllEventParameterResponse>> GetAllEventParameterByEventId(int apiEventId)
        {
            return repositoryManager.apiEventRequiredFieldsMapping.GetAllEventParameterByEventId(apiEventId);
        }

        #endregion
    }
}
