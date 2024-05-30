using OMS.Domain.Entities.API.Request;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Test;

namespace OMS.Application.Services.Test
{
    public interface ITestService
    {
        Task<AddEntityDTO<int>> AddTest(AddTestRequest addTest);
        Task<List<TestDTO>> GetTestList();
        Task<int> Test(string id);
    }
}
