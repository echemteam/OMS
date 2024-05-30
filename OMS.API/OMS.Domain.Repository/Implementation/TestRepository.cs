using OMS.Domain.Entities.API.Request;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Test;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class TestRepository : BaseRepository<TestOMS>, ITestRepository
    {
        const string ADDTEST = "AddTest";
        const string GETTEST = "GetTest";

        public TestRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<AddEntityDTO<int>> AddTest(AddTestRequest addTest)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDTEST, new
            {
                addTest.Name,
                addTest.City,
                addTest.State
            }, CommandType.StoredProcedure);
        }

        public async Task<List<TestDTO>> GetTestList()
        {
            return await _context.GetList<TestDTO>(GETTEST, commandType: CommandType.StoredProcedure);
        }
    }
}
