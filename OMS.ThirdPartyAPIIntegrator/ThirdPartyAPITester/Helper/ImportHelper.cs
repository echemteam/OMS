using Dapper;
using System.Data;
using ThirdPartyAPILibrary.Model;

namespace ThirdPartyAPILibrary.Helper
{
    public class ImportHelper : BaseImport
    {
        public ImportHelper(APIClientDapperContext apiTesterDapperContext) : base(apiTesterDapperContext)
        {
        }

        public async Task<APIEventResponse> GetAPIEndPointByApiEventId(string eventName)
        {
            try
            {
                string sql = "GetAPIEndPointByApiEventId";
                APIEventResponse config = await _context.GetFrist<APIEventResponse>(sql, new { eventName }, CommandType.StoredProcedure);
                return config;
            }
            catch (Exception ex)
            {
                throw ex;
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
                throw ex;
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
                throw ex;
            }
        }
        public async Task AddApiEventLog(int eventId, string requestData, int? statusCode, string? errorMessage, string logType, string requestUrl)
        {
            try
            {
                string procedure = "AddApiEventLog";
                var parameters = new
                {
                    EventId = eventId,
                    RequestData = requestData,
                    StatusCode = statusCode,
                    ErrorMessage = errorMessage,
                    LogType = logType,
                    RequestUrl = requestUrl
                };

                await _context.Execute(procedure, parameters, CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
