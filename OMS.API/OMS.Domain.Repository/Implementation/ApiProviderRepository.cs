using OMS.Domain.Entities.API.Response.ApiProvider;
using OMS.Domain.Entities.Entity.ApiProvider;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiProviderRepository : BaseRepository<Addresses>, IApiProviderRepository
    {
        #region SP Name
        const string ADDEDITAPIPROVIDER = "AddEditApiProvider";
        const string GETAPIPROVIDERBYPROVIDERID = "GetApiProviderByProviderId";
        const string DELETEAPIPROVIDER = "DeleteApiProvider";
        const string GETAPIPROVIDERS = "GetApiProviders";
        #endregion

        public ApiProviderRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region API Configuration Repository
        public async Task<AddEntityDTO<int>> AddEditApiProvider(ApiProviderDTO apiProvider)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITAPIPROVIDER, new
            {
                apiProvider.ProviderId,
                apiProvider.Name,
                apiProvider.BaseURL,
                apiProvider.AuthenticationType,
                apiProvider.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetApiProviderByProviderIdResponse> GetApiProviderByProviderId(int providerId)
        {
            GetApiProviderByProviderIdResponse getCustomerAddresssByAddressIdResponse = await _context.GetFrist<GetApiProviderByProviderIdResponse>(GETAPIPROVIDERBYPROVIDERID, new
            {
                providerId
            }, commandType: CommandType.StoredProcedure);
            return getCustomerAddresssByAddressIdResponse;
        }
        public async Task<AddEntityDTO<int>> DeleteApiProvider(int providerId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEAPIPROVIDER, new
            {
                providerId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetApiProvidersResponse>> GetApiProviders(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<GetApiProvidersResponse>(GETAPIPROVIDERS, new
            {
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText
            }, true);
        }
        #endregion
    }
}
