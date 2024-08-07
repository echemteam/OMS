using OMS.Domain.Entities.API.Request.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.API.Response.ApiEventRequiredFieldsMapping;
using OMS.Domain.Entities.API.Response.Common;
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
        const string GETALLAPIPARAMETERSBYENDPOINTID = "GetAllAPIParametersByEndpointId";
        const string GETALLREQUIREDFIELDSBYEVENTID = "GetAllRequiredFieldsByEventId";
        const string GETALLEVENTPARAMETERBYEVENTID = "GetAllEventParameterByEventId";
        #endregion

        public ApiEventRequiredFieldsMappingRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Repository
        public async Task<AddEntityDto<int>> AddApiEventRequiredFieldsMapping(ApiEventRequiredFieldsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDAPIEVENTREQUIREDFIELDSMAPPING, new
            {
                requestData.ApiEventRequiredFieldId,
                requestData.ApiEventId,
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

        public async Task<AddEntityDto<int>> DeleteApiEventRequiredFieldsMapping(int apiEventRequiredFieldsMappingId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETEAPIEVENTREQUIREDFIELDSMAPPING, new
            {
                apiEventRequiredFieldsMappingId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetAllAPIParametersResponse>> GetAllAPIParametersByEndpointId(int endpointId)
        {
            return await _context.GetList<GetAllAPIParametersResponse>(GETALLAPIPARAMETERSBYENDPOINTID, new
            {
                endpointId
            }, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllRequiredFieldsResponse>> GetAllRequiredFieldsByEventId(int apiEventId)
        {
            return await _context.GetList<GetAllRequiredFieldsResponse>(GETALLREQUIREDFIELDSBYEVENTID, new
            {
                apiEventId
            }, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllEventParameterResponse>> GetAllEventParameterByEventId(int apiEventId)
        {
            return await _context.GetList<GetAllEventParameterResponse>(GETALLEVENTPARAMETERBYEVENTID, new
            {
                apiEventId
            }, commandType: CommandType.StoredProcedure);
        }
        #endregion
    }
}
