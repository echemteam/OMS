﻿using OMS.Domain.Entities.API.Request.ApiEventMapping;
using OMS.Domain.Entities.API.Response.ApiEventMapping;
using OMS.Domain.Entities.Entity.ApiEventMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiEventMappingRepository : BaseRepository<ApiEventMapping>, IApiEventMappingRepository
    {
        #region SP Name
        const string ADDAPIEVENTMAPPING = "AddApiEventMapping";
        const string GETAPIEVENTMAPPINGS = "GetApiEventMappings";
        const string DELETEAPIEVENTMAPPING = "DeleteApiEventMapping";
        #endregion

        public ApiEventMappingRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Repository
        public async Task<AddEntityDto<int>> AddApiEventMapping(ApiEventMappingDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDAPIEVENTMAPPING, new
            {
                requestData.ApiEventId,
                requestData.ProviderId,
                requestData.EndpointId,
                requestData.Description,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<GetApiEventMappingsResponse> GetApiEventMappings(GetApiEventMappingsRequest requestData)
        {
            return await _context.GetFrist<GetApiEventMappingsResponse>(GETAPIEVENTMAPPINGS, new
            {
                requestData.ApiEventId,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> DeleteApiEventMapping(int apiEventMappingId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETEAPIEVENTMAPPING, new
            {
                apiEventMappingId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
