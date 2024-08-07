using Dapper;
using System.Data;
using ThirdPartyAPITester.Model;

namespace ThirdPartyAPITester.Helper
{
    public class ImportHelper : BaseImport
    {
        public ImportHelper(APITesterDapperContext apiTesterDapperContext) : base(apiTesterDapperContext)
        {
        }

        public async Task<APIEvent> GetAPIEndPointByApiEventId(int apiEventId)
        {
            try
            {
                string sql = "GetAPIEndPointByApiEventId";
                APIEvent config = await _context.GetFrist<APIEvent>(sql, new { apiEventId }, CommandType.StoredProcedure);
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
