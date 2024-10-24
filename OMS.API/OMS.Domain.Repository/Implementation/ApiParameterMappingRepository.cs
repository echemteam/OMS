﻿using OMS.Domain.Entities.API.Request.ApiParameterMapping;
using OMS.Domain.Entities.API.Response.ApiParameterMapping;
using OMS.Domain.Entities.Entity.ApiParameterMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiParameterMappingRepository : BaseRepository<ApiEventMapping>, IApiParameterMappingRepository
    {
        #region SP Name
        const string ADDAPIPARAMETERMAPPING = "AddApiParameterMapping";
        const string GETAPIPARAMETERMAPPINGS = "GetApiParameterMappings";
        const string DELETEAPIPARAMETERMAPPING = "DeleteApiParameterMapping";
        #endregion

        public ApiParameterMappingRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Repository
        public async Task<AddEntityDto<int>> AddApiParameterMapping(ApiParameterMappingDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDAPIPARAMETERMAPPING, new
            {
                requestData.ApiEventId,
                requestData.EventParameterId,
                requestData.ProviderParameterId,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetApiParameterMappingsResponse>> GetApiParameterMappings(GetApiParameterMappingsRequest requestData)
        {
            return await _context.GetListSP<GetApiParameterMappingsResponse>(GETAPIPARAMETERMAPPINGS, new
            {
                requestData.ApiEventId,
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }

        public async Task<AddEntityDto<int>> DeleteApiParameterMapping(int apiParameterMappingId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETEAPIPARAMETERMAPPING, new
            {
                apiParameterMappingId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
