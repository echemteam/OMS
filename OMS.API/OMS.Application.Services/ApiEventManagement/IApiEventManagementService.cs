using OMS.Domain.Entities.API.Request.ApiEvent;
using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Request.ApiEventParameter;
using OMS.Domain.Entities.API.Request.ApiEventRequiredField;
using OMS.Domain.Entities.API.Request.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.API.Response.ApiEventMapping;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.API.Response.ApiEventRequiredField;
using OMS.Domain.Entities.API.Response.ApiParameterMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.ApiEventManagement
{
    public interface IApiEventManagementService
    {
        Task<AddEntityDTO<int>> AddEditApiEvent(AddEditApiEventRequest requestData, short CurrentUserId);
        Task<GetApiEventByApiEventIdResponse> GetApiEventByApiEventId(int apiEventId);
        Task<AddEntityDTO<int>> DeleteApiEvent(int apiEventId, short CurrentUserId);
        Task<EntityList<GetApiEventsResponse>> GetApiEvents(ListEntityRequest<BaseFilter> requestData);
        Task<AddEntityDTO<int>> AddApiEventMapping(AddApiEventMappingRequest requestData, short CurrentUserId);
        Task<EntityList<GetApiEventMappingsResponse>> GetApiEventMappings(GetApiEventMappingsRequest requestData);
        Task<AddEntityDTO<int>> DeleteApiEventMapping(int apiEventMappingId, short CurrentUserId);
        Task<AddEntityDTO<int>> AddEditApiEventParameter(AddEditApiEventParameterRequest requestData, short CurrentUserId);
        Task<GetApiEventParameterByApiEventParametersIdResponse> GetApiEventParameterByApiEventParametersId(int apiEventParametersId);
        Task<AddEntityDTO<int>> DeleteApiEventParameter(int apiEventParametersId, short CurrentUserId);
        Task<EntityList<GetApiEventParametersResponse>> GetApiEventParameters(GetApiEventParametersRequest requestData);
        Task<AddEntityDTO<int>> AddApiParameterMapping(AddApiParameterMappingRequest requestData, short CurrentUserId);
        Task<EntityList<GetApiParameterMappingsResponse>> GetApiParameterMappings(GetApiParameterMappingsRequest requestData);
        Task<AddEntityDTO<int>> DeleteApiParameterMapping(int apiParameterMappingId, short CurrentUserId);
        Task<AddEntityDTO<int>> AddEditApiEventRequiredField(AddEditApiEventRequiredFieldRequest requestData, short CurrentUserId);
        Task<GetApiEventRequiredFieldByApiEventRequiredFieldIdResponse> GetApiEventRequiredFieldByApiEventRequiredFieldId(int apiEventRequiredFieldId);
        Task<AddEntityDTO<int>> DeleteApiEventRequiredField(int apiEventRequiredFieldId, short CurrentUserId);
        Task<EntityList<GetApiEventRequiredFieldsResponse>> GetApiEventRequiredFields(GetApiEventRequiredFieldsRequest requestData);


    }
}
