using OMS.Domain.Entities.API.Request.ApiEventRequiredField;
using OMS.Domain.Entities.API.Response.ApiEventRequiredField;
using OMS.Domain.Entities.Entity.ApiEventRequiredField;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiEventRequiredFieldRepository : BaseRepository<ApiEventRequiredField>, IApiEventRequiredFieldRepository
    {
        #region SP Name
        const string ADDEDITAPIEVENTREQUIREDFIELD = "AddEditApiEventRequiredField";
        const string GETAPIEVENTREQUIREDFIELDBYAPIEVENTREQUIREDFIELDID = "GetApiEventRequiredFieldByApiEventRequiredFieldId";
        const string DELETEAPIEVENTREQUIREDFIELD = "DeleteApiEventRequiredField";
        const string GETAPIEVENTREQUIREDFIELDS = "GetApiEventRequiredFields";
        #endregion

        public ApiEventRequiredFieldRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Api Event Parameter Repository
        public async Task<AddEntityDTO<int>> AddEditApiEventRequiredField(ApiEventRequiredFieldDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITAPIEVENTREQUIREDFIELD, new
            {
                requestData.ApiEventRequiredFieldId,
                requestData.FieldName,
                requestData.FieldType,
                requestData.FieldDescription,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetApiEventRequiredFieldByApiEventRequiredFieldIdResponse> GetApiEventRequiredFieldByApiEventRequiredFieldId(int apiEventRequiredFieldId)
        {
            GetApiEventRequiredFieldByApiEventRequiredFieldIdResponse getApiEventParameterByApiEventParametersIdResponse = await _context.GetFrist<GetApiEventRequiredFieldByApiEventRequiredFieldIdResponse>(GETAPIEVENTREQUIREDFIELDBYAPIEVENTREQUIREDFIELDID, new
            {
                apiEventRequiredFieldId
            }, commandType: CommandType.StoredProcedure);
            return getApiEventParameterByApiEventParametersIdResponse;
        }
        public async Task<AddEntityDTO<int>> DeleteApiEventRequiredField(int apiEventRequiredFieldId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEAPIEVENTREQUIREDFIELD, new
            {
                apiEventRequiredFieldId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetApiEventRequiredFieldsResponse>> GetApiEventRequiredFields(GetApiEventRequiredFieldsRequest requestData)
        {
            return await _context.GetListSP<GetApiEventRequiredFieldsResponse>(GETAPIEVENTREQUIREDFIELDS, new
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
