using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DictionaryController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public DictionaryController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion
        #region Dectionary API
        [HttpPost("AddEditDictionary")]
        public async Task<IActionResult> AddEditDictionary(AddEditDictonaryRequest requestData)
        {
            var dictionaryData = await _serviceManager.dictionaryServices.AddEditDictionary(requestData);
            return APISucessResponce(dictionaryData);
        }
        #endregion
    }
}
