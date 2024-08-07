using OMS.Domain.Entities.API.Request.ApiEventParameter;
using OMS.Domain.Entities.API.Response.ApiEventParameter;
using OMS.Domain.Entities.Entity.ApiEventParameter;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiEventParameterRepository : BaseRepository<ApiEventParameter>, IApiEventParameterRepository
    {
        #region SP Name
        const string ADDEDITAPIEVENTPARAMETER = "AddEditApiEventParameter";
        const string GETAPIEVENTPARAMETERBYAPIEVENTPARAMETERSID = "GetApiEventParameterByApiEventParametersId";
        const string DELETEAPIEVENTPARAMETER = "DeleteApiEventParameter";
        const string GETAPIEVENTPARAMETERS = "GetApiEventParameters";
        #endregion

        public ApiEventParameterRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Parameter Repository
        public async Task<AddEntityDto<int>> AddEditApiEventParameter(ApiEventParameterDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITAPIEVENTPARAMETER, new
            {
                requestData.ApiEventId,
                requestData.ParameterId,
                requestData.ParameterName,
                requestData.ParameterType,
                requestData.DefaultValue,
                requestData.IsRequired,
                requestData.DataType,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetApiEventParameterByApiEventParametersIdResponse> GetApiEventParameterByApiEventParametersId(int apiEventId)
        {
            GetApiEventParameterByApiEventParametersIdResponse getApiEventParameterByApiEventParametersIdResponse = await _context.GetFrist<GetApiEventParameterByApiEventParametersIdResponse>(GETAPIEVENTPARAMETERBYAPIEVENTPARAMETERSID, new
            {
                apiEventId
            }, commandType: CommandType.StoredProcedure);
            return getApiEventParameterByApiEventParametersIdResponse;
        }
        public async Task<AddEntityDto<int>> DeleteApiEventParameter(int apiEventParametersId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETEAPIEVENTPARAMETER, new
            {
                parameterId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetApiEventParametersResponse>> GetApiEventParameters(GetApiEventParametersRequest requestData)
        {
            return await _context.GetListSP<GetApiEventParametersResponse>(GETAPIEVENTPARAMETERS, new
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
