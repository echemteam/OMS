using OMS.Domain.Entities.API.Response.ApiParameter;
using OMS.Domain.Entities.Entity.ApiParameter;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiParameterRepository : BaseRepository<Addresses>, IApiParameterRepository
    {
        #region SP Name
        const string ADDEDITAPIPARAMETER = "AddEditApiParameter";
        const string GETAPIAPIPARAMETERBYPARAMETERID = "GetApiApiParameterByParameterId";
        const string DELETEAPIPARAMETER = "DeleteApiParameter";
        const string GETAPIPARAMETERS = "GetApiParameters";
        #endregion

        public ApiParameterRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region API Configuration Repository
        public async Task<AddEntityDTO<int>> AddEditApiParameter(ApiParameterDTO apiParameter)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITAPIPARAMETER, new
            {
                apiParameter.ParameterId,
                apiParameter.EndpointId,
                apiParameter.Name,
                apiParameter.DataType,
                apiParameter.DefaultValue,
                apiParameter.IsRequired,
                apiParameter.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetApiApiParameterByParameterIdResponse> GetApiApiParameterByParameterId(int parameterId)
        {
            GetApiApiParameterByParameterIdResponse getApiApiParameterByParameterIdResponse = await _context.GetFrist<GetApiApiParameterByParameterIdResponse>(GETAPIAPIPARAMETERBYPARAMETERID, new
            {
                parameterId
            }, commandType: CommandType.StoredProcedure);
            return getApiApiParameterByParameterIdResponse;
        }
        public async Task<AddEntityDTO<int>> DeleteApiParameter(int parameterId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEAPIPARAMETER, new
            {
                parameterId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetApiParametersResponse>> GetApiParameters(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<GetApiParametersResponse>(GETAPIPARAMETERS, new
            {
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText
            }, true);
        }
        #endregion
    }
}
