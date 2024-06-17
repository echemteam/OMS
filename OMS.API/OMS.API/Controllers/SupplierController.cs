using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public SupplierController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Suppliers API
        [HttpPost("AddEditSupplierBasicInformation")]
        public async Task<IActionResult> AddEditSupplierBasicInformation(AddEditSupplierBasicInformationRequest requestData)
        {
            var addEditItem = await _serviceManager.supplierServices.AddEditSupplierBasicInformation(requestData, CurrentUserId);
            return APISucessResponce(addEditItem);
        }

        #endregion
    }
}
