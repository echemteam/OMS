using ClientIPAuthentication;
using Common.Helper.Utility;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request;
using OMS.Framework;
using OMS.Shared.Services.Contract;
using static Common.Helper.Utility.EncryptionUtil;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    [CheckClientIpActionFilter]
    public class TestController : BaseController
    {
        #region private variable 
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public TestController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Test API

        [HttpPost("Test")]
        public async Task<IActionResult> Test(string id)
        {
            var testid = await _serviceManager.testService.Test(id);
            return APISucessResponce(testid);
        }

        [HttpGet("GetAllEntries")]
        public string GetAllEntries()
        {
            EncryptionUtil.GenerateAesKeyAndAesIV();
            return $"Hello api is working..!!";
        }

        [HttpGet("GenerateAesKeyAndAesIV")]
        public string GenerateAesKeyAndAesIV()
        {
            return EncryptionUtil.GenerateAesKeyAndAesIV();
        }

        [HttpGet("GenerateRandomBytes")]
        public byte[] GenerateRandomBytes()
        {
            return EncryptionUtil.GenerateRandomBytes(16);
        }

        [HttpGet("GenerateSecretKey")]
        public string GenerateSecretKey()
        {
            return JwtSecretKeyGenerator.GenerateSecretKey(54);
        }

        [HttpGet("GetDataByRawSQL")]
        public async Task<IActionResult> GetDataByRawSQL()
        {
            var test = await _serviceManager.testService.GetTestList();
            return APISucessResponce<object>(test);
        }


        [HttpPost("AddTest")]
        public async Task<IActionResult> AddTest(AddTestRequest addTest)
        {
            var addItem = await _serviceManager.testService.AddTest(addTest);
            return APISucessResponce(addItem);
        }


        #endregion

    }
}
