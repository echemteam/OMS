using OMS.Domain.Entities.API.Request.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Response.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.Entity.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiEventRequiredFieldsMappingRepository : BaseRepository<ApiEventRequiredFields>, IApiEventRequiredFieldsMappingRepository
    {
        #region SP Name
        const string ADDAPIEVENTREQUIREDFIELDSMAPPING = "AddApiEventRequiredFieldsMapping";
        const string GETAPIEVENTREQUIREDFIELDSMAPPINGS = "GetApiEventRequiredFieldsMappings";
        const string DELETEAPIEVENTREQUIREDFIELDSMAPPING = "DeleteApiEventRequiredFieldsMapping";
        #endregion

        public ApiEventRequiredFieldsMappingRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Repository
        public async Task<AddEntityDTO<int>> AddApiEventRequiredFieldsMapping(ApiEventRequiredFieldsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDAPIEVENTREQUIREDFIELDSMAPPING, new
            {
                requestData.ApiEventRequiredFieldId,
                requestData.RequiredField,
                requestData.ApiEventId,
                requestData.EndpointId,
                requestData.APIResponseFieldName,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetApiEventRequiredFieldsMappingsResponse>> GetApiEventRequiredFieldsMappings(GetApiEventRequiredFieldsMappingsRequest requestData)
        {
            return await _context.GetListSP<GetApiEventRequiredFieldsMappingsResponse>(GETAPIEVENTREQUIREDFIELDSMAPPINGS, new
            {
                requestData.ApiEventId,
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }

        public async Task<AddEntityDTO<int>> DeleteApiEventRequiredFieldsMapping(int apiEventRequiredFieldsMappingId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEAPIEVENTREQUIREDFIELDSMAPPING, new
            {
                apiEventRequiredFieldsMappingId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
