using OMS.Domain.Entities.API.Response.ApiEndpoint;
using OMS.Domain.Entities.Entity.ApiEndpoint;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiEndpointRepository : BaseRepository<Addresses>, IApiEndpointRepository
    {
        #region SP Name
        const string ADDEDITAPIENDPOINT = "AddEditApiEndpoint";
        const string GETAPIENDPOINTBYENDPOINTID = "GetApiEndpointByEndpointId";
        const string DELETEAPIENDPOINT = "DeleteApiEndpoint";
        const string GETAPIENDPOINTS = "GetApiEndpoints";
        #endregion

        public ApiEndpointRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region API Configuration Repository
        public async Task<AddEntityDTO<int>> AddEditApiEndpoint(ApiEndpointDTO apiEndpoint)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITAPIENDPOINT, new
            {
                apiEndpoint.EndpointId,
                apiEndpoint.ProviderId,
                apiEndpoint.Name,
                apiEndpoint.Path,
                apiEndpoint.Method,
                apiEndpoint.Description,
                apiEndpoint.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetApiEndpointByEndpointIdResponse> GetApiEndpointByEndpointId(int endpointId)
        {
            GetApiEndpointByEndpointIdResponse getCustomerAddresssByAddressIdResponse = await _context.GetFrist<GetApiEndpointByEndpointIdResponse>(GETAPIENDPOINTBYENDPOINTID, new
            {
                endpointId
            }, commandType: CommandType.StoredProcedure);
            return getCustomerAddresssByAddressIdResponse;
        }
        public async Task<AddEntityDTO<int>> DeleteApiEndpoint(int endpointId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEAPIENDPOINT, new
            {
                endpointId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetApiEndpointsResponse>> GetApiEndpoints(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<GetApiEndpointsResponse>(GETAPIENDPOINTS, new
            {
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText
            }, true);
        }
        #endregion
    }
}
