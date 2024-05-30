using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Test;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Test
{
    public class TestService : BaseServices, ITestService
    {


        public TestService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }

        #region Test Services
        public async Task<int> Test(string id)
        {
            int data = Convert.ToInt32(id);
            return data;
        }

        public async Task<List<TestDTO>> GetTestList()
        {
            return await repositoryManager.test.GetTestList();
        }

        public async Task<AddEntityDTO<int>> AddTest(AddTestRequest addTest)
        {
            return await repositoryManager.test.AddTest(addTest);
        }
        #endregion
    }
}
