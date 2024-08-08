using OMS.Domain.Entities.API.Request;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Test;

namespace OMS.Application.Services.Test
{
    public interface ITestService
    {
        Task<AddEntityDto<int>> AddTest(AddTestRequest addTest);
        Task<List<TestDto>> GetTestList();
        Task<int> Test(string id);
    }
}
