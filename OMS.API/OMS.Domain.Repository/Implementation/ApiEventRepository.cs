using OMS.Domain.Entities.API.Request.ApiConfiguration;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.ApiConfiguration;
using OMS.Domain.Entities.API.Response.ApiEvent;
using OMS.Domain.Entities.API.Response.Customers;
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
        const string GETAPIEVENTLOGBYEVENTID = "GetApiEventLogByEventId";
        #endregion

        public ApiEventRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Repository
        public async Task<AddEntityDto<int>> AddEditApiEvent(ApiEventDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITAPIEVENT, new
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
        public async Task<AddEntityDto<int>> DeleteApiEvent(int apiEventId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETEAPIEVENT, new
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
        public async Task<EntityList<GetApiEventLogByEventIdResponse>> GetApiEventLogByEventId(GetApiEventLogByEventIdRequest requestData)
        {
            return await _context.GetListSP<GetApiEventLogByEventIdResponse>(GETAPIEVENTLOGBYEVENTID, new
            {
                requestData.EventId,
                requestData.Pagination!.PageNumber,
                requestData.Pagination.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }
        #endregion
    }
}
