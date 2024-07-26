using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.Entity.ApiEvent;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiEventRepository : BaseRepository<ApiEvent>, IApiEventRepository
    {
        #region SP Name
        const string ADDEDITAPIEVENT = "AddEditApiEvent";
        const string GETAPIEVENTBYAPIEVENTID = "GetApiEventByApiEventId";
        const string DELETEAPIEVENT = "DeleteApiEvent";
        const string GETAPIEVENTS = "GetApiEvents";
        #endregion

        public ApiEventRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Repository
        public async Task<AddEntityDTO<int>> AddEditApiEvent(ApiEventDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITAPIEVENT, new
            {
                requestData.ApiEventId,
                requestData.EventName,
                requestData.Description,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetApiEventByApiEventIdResponse> GetApiEventByApiEventId(int apiEventId)
        {
            GetApiEventByApiEventIdResponse getApiEventByApiEventIdResponse = await _context.GetFrist<GetApiEventByApiEventIdResponse>(GETAPIEVENTBYAPIEVENTID, new
            {
                apiEventId
            }, commandType: CommandType.StoredProcedure);
            return getApiEventByApiEventIdResponse;
        }
        public async Task<AddEntityDTO<int>> DeleteApiEvent(int apiEventId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEAPIEVENT, new
            {
                apiEventId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetApiEventsResponse>> GetApiEvents(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<GetApiEventsResponse>(GETAPIEVENTS, new
            {
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }
        #endregion
    }
}
