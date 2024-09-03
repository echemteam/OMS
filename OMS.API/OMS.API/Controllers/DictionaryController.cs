using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Dictionary;
using OMS.Domain.Entities.Entity.CommonEntity;
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
            var dictionaryData = await _serviceManager.dictionaryServices.AddEditDictionary(requestData, CurrentUserId);
            return APISucessResponce(dictionaryData);
        }

        [HttpPost("GetAllDictionary")]
        public async Task<IActionResult> GetAllDictionary([FromBody] ListEntityRequest<BaseFilter> requestData)
        {
            var dictionaryList = await _serviceManager.dictionaryServices.GetAllDictionary(requestData);
            return APISucessResponce<object>(dictionaryList);
        }

        [HttpGet("GetDictionaryByDictonaryId")]
        public async Task<IActionResult> GetDictionaryByDictonaryId(int dictionaryId)
        {
            if (dictionaryId > 0)
            {
                var dictionary = await _serviceManager.dictionaryServices.GetDictionaryByDictonaryId(dictionaryId).ConfigureAwait(true);
                return APISucessResponce<object>(dictionary);
            }
            return APISucessResponce(dictionaryId);
        }
        [HttpDelete("DeleteDictionary")]
        public async Task<IActionResult> DeleteDictionary(int dictionaryId)
        {
            if (dictionaryId > 0)
            {
                var deletedictionary = await _serviceManager.dictionaryServices.DeleteDictionary(dictionaryId, CurrentUserId).ConfigureAwait(true);
                return APISucessResponce<object>(deletedictionary);
            }
            return APISucessResponce(dictionaryId);
        }

        #endregion
    }
}
