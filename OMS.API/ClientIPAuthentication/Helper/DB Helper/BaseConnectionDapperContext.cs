using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientIPAuthentication.Helper.DB_Helper
{
    public class BaseConnectionDapperContext
    {
        public readonly ConnectionDapperContext _context;
        public readonly IDbConnection _connection;

        public BaseConnectionDapperContext(ConnectionDapperContext apiTesterDapperContext)
        {
            _context = apiTesterDapperContext;
            _connection = _context.CreateConnection();
        }
    }
}
