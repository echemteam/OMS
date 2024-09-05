using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.ApiEvent;
using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Request.ApiEventParameter;
using OMS.Domain.Entities.API.Request.ApiEventRequiredField;
using OMS.Domain.Entities.API.Request.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Request.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.ApiConfiguration;
using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.API.Response.ApiEventMapping;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.API.Response.ApiEventRequiredField;
using OMS.Domain.Entities.API.Response.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Response.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.ApiEventManagement
{
    public interface IApiEventManagementService
    {
        Task<AddEntityDto<int>> AddEditApiEvent(AddEditApiEventRequest requestData, short CurrentUserId);
        Task<GetApiEventByApiEventIdResponse> GetApiEventByApiEventId(int apiEventId);
        Task<AddEntityDto<int>> DeleteApiEvent(int apiEventId, short CurrentUserId);
        Task<EntityList<GetApiEventsResponse>> GetApiEvents(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDto<int>> AddApiEventMapping(AddApiEventMappingRequest requestData, short CurrentUserId);
        Task<GetApiEventMappingsResponse> GetApiEventMappings(GetApiEventMappingsRequest requestData);
        Task<AddEntityDto<int>> DeleteApiEventMapping(int apiEventMappingId, short CurrentUserId);
        Task<AddEntityDto<int>> AddEditApiEventParameter(AddEditApiEventParameterRequest requestData, short CurrentUserId);
        Task<GetApiEventParameterByApiEventParametersIdResponse> GetApiEventParameterByApiEventParametersId(int apiEventParametersId);
        Task<AddEntityDto<int>> DeleteApiEventParameter(int parameterId, int apiEventParametersId, short CurrentUserId);
        Task<EntityList<GetApiEventParametersResponse>> GetApiEventParameters(GetApiEventParametersRequest requestData);
        Task<AddEntityDto<int>> AddApiParameterMapping(AddApiParameterMappingRequest requestData, short CurrentUserId);
        Task<EntityList<GetApiParameterMappingsResponse>> GetApiParameterMappings(GetApiParameterMappingsRequest requestData);
        Task<AddEntityDto<int>> DeleteApiParameterMapping(int apiParameterMappingId, short CurrentUserId);
        Task<AddEntityDto<int>> AddEditApiEventRequiredField(AddEditApiEventRequiredFieldRequest requestData, short CurrentUserId);
        Task<GetApiEventRequiredFieldByApiEventRequiredFieldIdResponse> GetApiEventRequiredFieldByApiEventRequiredFieldId(int apiEventRequiredFieldId);
        Task<AddEntityDto<int>> DeleteApiEventRequiredField(int apiEventRequiredFieldId, short CurrentUserId);
        Task<EntityList<GetApiEventRequiredFieldsResponse>> GetApiEventRequiredFields(GetApiEventRequiredFieldsRequest requestData);
        Task<AddEntityDto<int>> AddApiEventRequiredFieldsMapping(AddApiEventRequiredFieldsMappingRequest requestData, short CurrentUserId);
        Task<EntityList<GetApiEventRequiredFieldsMappingsResponse>> GetApiEventRequiredFieldsMappings(GetApiEventRequiredFieldsMappingsRequest requestData);
        Task<AddEntityDto<int>> DeleteApiEventRequiredFieldsMapping(int apiEventRequiredFieldsMappingId, short CurrentUserId);
        Task<List<GetAllAPIParametersResponse>> GetAllAPIParametersByEndpointId(int endpointId);
        Task<List<GetAllRequiredFieldsResponse>> GetAllRequiredFieldsByEventId(int apiEventId);
        Task<List<GetAllEventParameterResponse>> GetAllEventParameterByEventId(int apiEventId);
        Task<EntityList<GetApiEventLogByEventIdResponse>> GetApiEventLogByEventId(GetApiEventLogByEventIdRequest requestData);
    }
}
