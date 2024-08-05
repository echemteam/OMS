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
            catch (Exception)
            {
                throw;
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
            catch (Exception)
            {
                throw;
            }
        }
    }
}
