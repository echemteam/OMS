using OMS.Domain.Repository.Contract;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        public readonly DapperContext _context;
        public readonly IDbConnection _connection;

        public BaseRepository(DapperContext dapperContext)
        {
            _context = dapperContext;
            _connection = _context.CreateConnection();
        }
    }
}
