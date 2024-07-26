﻿using OMS.Domain.Entities.API.Request.ApiEvent;
using OMS.Domain.Entities.API.Response.ApiEvent;
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

    }
}