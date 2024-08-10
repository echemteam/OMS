using OMS.Domain.Entities.API.Request;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Test;

namespace OMS.Domain.Repository.Contract
{
    public interface ITestRepository
    {
        Task<AddEntityDto<int>> AddTest(AddTestRequest addTest);
        Task<List<TestDto>> GetTestList();
    }
}
