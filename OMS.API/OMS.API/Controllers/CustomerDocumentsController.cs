using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerDocumentsController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public CustomerDocumentsController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Customer Documents API

        [HttpPost("AddCustomerDocuments")]
        public async Task<IActionResult> AddCustomerDocuments(AddCustomerDocumentsRequest requestData)
        {
            var addItem = await _serviceManager.customerDocumentsService.AddCustomerDocuments(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }
        #endregion

    }
}
