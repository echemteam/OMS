using System.Data;

namespace ThirdPartyAPITester.Helper
{
    public class BaseImport
    {
        public readonly APITesterDapperContext _context;
        public readonly IDbConnection _connection;

        public BaseImport(APITesterDapperContext apiTesterDapperContext)
        {
            _context = apiTesterDapperContext;
            _connection = _context.CreateConnection();
        }
    }
}
