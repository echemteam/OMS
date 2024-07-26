using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.Entity.ApiEvent;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiEventRepository
    {
        Task<AddEntityDTO<int>> AddEditApiEvent(ApiEventDTO requestData);
        Task<GetApiEventByApiEventIdResponse> GetApiEventByApiEventId(int apiEventId);
        Task<AddEntityDTO<int>> DeleteApiEvent(int apiEventId, int deletedBy);
        Task<EntityList<GetApiEventsResponse>> GetApiEvents(ListEntityRequest<BaseFilter> requestData);

    }
}
