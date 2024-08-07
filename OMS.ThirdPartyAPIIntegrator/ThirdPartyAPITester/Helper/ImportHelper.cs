using Dapper;
using System.Data;
using ThirdPartyAPIClientLibrary.Model;

namespace ThirdPartyAPIClientLibrary.Helper
{
    public class ImportHelper : BaseImport
    {
        public ImportHelper(APIClientDapperContext apiTesterDapperContext) : base(apiTesterDapperContext)
        {
        }

        public async Task<APIEventResponse> GetAPIEndPointByApiEventId(int apiEventId)
        {
            try
            {
                string sql = "GetAPIEndPointByApiEventId";
                APIEventResponse config = await _context.GetFrist<APIEventResponse>(sql, new { apiEventId }, CommandType.StoredProcedure);
                return config;
            }
            catch (Exception ex)
            {
                throw (Exception)ex;
            }
        }

        public async Task<List<APIRequiredFields>> GetAPIRequiredFieldsByEventId(int apiEventId)
        {
            try
            {
                string sql = "GetAPIRequiredFieldsByEventId";
                List<APIRequiredFields> config = await _context.GetList<APIRequiredFields>(sql, new { apiEventId }, CommandType.StoredProcedure);
                return config;
            }
            catch (Exception ex)
            {
                throw (Exception)ex;
            }
        }

        public async Task<bool> UpdateAPIAuthticationToken(string token, DateTime tokenExpires, int authId)
        {
            try
            {
                string sql = "UPDATE [dbo].[APIAuthentication] SET Token=" + token + ",TokenExpiryTime='" + tokenExpires + "' WHERE AuthId=" + authId;
                var result = await _connection.QuerySingleOrDefaultAsync(sql, commandType: CommandType.Text).ConfigureAwait(false);

                return result;
            }
            catch (Exception ex)
            {
                throw (Exception)ex;
            }
        }
    }
}
