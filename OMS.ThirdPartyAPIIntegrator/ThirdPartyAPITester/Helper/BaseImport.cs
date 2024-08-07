using System.Data;

namespace ThirdPartyAPIClientLibrary.Helper
{
    public class BaseImport
    {
        public readonly APIClientDapperContext _context;
        public readonly IDbConnection _connection;

        public BaseImport(APIClientDapperContext apiTesterDapperContext)
        {
            _context = apiTesterDapperContext;
            _connection = _context.CreateConnection();
        }
    }
}
