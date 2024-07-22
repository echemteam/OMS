using OMS.Domain.Entities.API.Request.ApiAuthentication;
using OMS.Domain.Entities.API.Response.ApiAuthentication;
using OMS.Domain.Entities.Entity.ApiAuthentication;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApiAuthenticationRepository : BaseRepository<ApiAuthentication>, IApiAuthenticationRepository
    {
        #region SP Name
        const string ADDEDITAPIAUTHENTICATION = "AddEditApiAuthentication";
        const string GETAPIAUTHENTICATIONBYAUTHID = "GetApiAuthenticationByAuthId";
        const string DELETEAPIAUTHENTICATION = "DeleteApiAuthentication";
        const string GETAPIAUTHENTICATIONS = "GetApiAuthentications";
        #endregion

        public ApiAuthenticationRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region API Configuration Repository
        public async Task<AddEntityDTO<int>> AddEditApiAuthentication(ApiAuthenticationDTO apiAuthentication)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITAPIAUTHENTICATION, new
            {
                apiAuthentication.AuthId,
                apiAuthentication.ProviderId,
                apiAuthentication.AuthKey,
                apiAuthentication.ClientId,
                apiAuthentication.ClientSecret,
                apiAuthentication.TokenEndpoint,
                apiAuthentication.TokenExpires,
                apiAuthentication.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetApiAuthenticationByAuthIdResponse> GetApiAuthenticationByAuthId(int authId)
        {
            GetApiAuthenticationByAuthIdResponse getApiApiParameterByParameterIdResponse = await _context.GetFrist<GetApiAuthenticationByAuthIdResponse>(GETAPIAUTHENTICATIONBYAUTHID, new
            {
                authId
            }, commandType: CommandType.StoredProcedure);
            return getApiApiParameterByParameterIdResponse;
        }
        public async Task<AddEntityDTO<int>> DeleteApiAuthentication(int authId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEAPIAUTHENTICATION, new
            {
                authId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetApiAuthenticationsResponse>> GetApiAuthentications(GetApiAuthenticationsRequest requestData)
        {
            return await _context.GetListSP<GetApiAuthenticationsResponse>(GETAPIAUTHENTICATIONS, new
            {
                requestData.ProviderId,
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }
        #endregion
    }
}
