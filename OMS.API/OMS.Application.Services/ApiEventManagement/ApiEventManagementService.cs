using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.ApiEvent;
using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.API.Response.ApiEventMapping;
using OMS.Domain.Entities.Entity.ApiEvent;
using OMS.Domain.Entities.Entity.ApiEventMapping;
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
        public async Task<AddEntityDTO<int>> AddEditApiEvent(AddEditApiEventRequest requestData, short CurrentUserId)
        {
            ApiEventDTO apiEventDTO = requestData.ToMapp<AddEditApiEventRequest, ApiEventDTO>();
            apiEventDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEvent.AddEditApiEvent(apiEventDTO);
        }
        public Task<GetApiEventByApiEventIdResponse> GetApiEventByApiEventId(int apiEventId)
        {
            return repositoryManager.apiEvent.GetApiEventByApiEventId(apiEventId);
        }
        public async Task<AddEntityDTO<int>> DeleteApiEvent(int apiEventId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.apiEvent.DeleteApiEvent(apiEventId, deletedBy);
        }
        public async Task<EntityList<GetApiEventsResponse>> GetApiEvents(ListEntityRequest<BaseFilter> requestData)
        {
            var apiEventsDetails = await repositoryManager.apiEvent.GetApiEvents(requestData);
            return apiEventsDetails!;
        }

        public async Task<AddEntityDTO<int>> AddApiEventMapping(AddApiEventMappingRequest requestData, short CurrentUserId)
        {
            ApiEventMappingDTO apiEventMappingDTO = requestData.ToMapp<AddApiEventMappingRequest, ApiEventMappingDTO>();
            apiEventMappingDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.apiEventMapping.AddApiEventMapping(apiEventMappingDTO);
        }
        public async Task<EntityList<GetApiEventMappingsResponse>> GetApiEventMappings(GetApiEventMappingsRequest requestData)
        {
            var apiEventMappingsDetails = await repositoryManager.apiEventMapping.GetApiEventMappings(requestData);
            return apiEventMappingsDetails!;
        }

        #endregion
    }
}
