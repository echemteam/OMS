using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Response.ApiEventMapping;
using OMS.Domain.Entities.Entity.ApiEventMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiEventMappingRepository : BaseRepository<ApiEventMapping>, IApiEventMappingRepository
    {
        #region SP Name
        const string ADDAPIEVENTMAPPING = "AddApiEventMapping";
        const string GETAPIEVENTMAPPINGS = "GetApiEventMappings";
        #endregion

        public ApiEventMappingRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Repository
        public async Task<AddEntityDTO<int>> AddApiEventMapping(ApiEventMappingDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDAPIEVENTMAPPING, new
            {
                requestData.ApiEventId,
                requestData.ProviderId,
                requestData.EndpointId,
                requestData.Description,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetApiEventMappingsResponse>> GetApiEventMappings(GetApiEventMappingsRequest requestData)
        {
            return await _context.GetListSP<GetApiEventMappingsResponse>(GETAPIEVENTMAPPINGS, new
            {
                requestData.ApiEventId,
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }
        #endregion
    }
}
