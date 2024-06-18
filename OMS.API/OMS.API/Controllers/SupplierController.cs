using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
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

        [HttpGet("GetSupplierBasicInformationById")]
        public async Task<IActionResult> GetSupplierBasicInformationById(int supplierId)
        {
            if (supplierId > 0)
            {
                var supplierDetails = await _serviceManager.supplierServices.GetSupplierBasicInformationById(supplierId).ConfigureAwait(true);
                return APISucessResponce<object>(supplierDetails);
            }
            return APISucessResponce(supplierId);
        }

        [HttpPost("GetSuppliers")]
        public async Task<IActionResult> GetSuppliers(GetSuppliersRequest queryRequest)
        {
            var suppliersList = await _serviceManager.supplierServices.GetSuppliers(queryRequest);
            return APISucessResponce<object>(suppliersList);
        }


        [HttpPost("UpdateSupplierInActiveStatus")]
        public async Task<IActionResult> UpdateSupplierInActiveStatus(UpdateSupplierInActiveStatusRequest requestData)
        {
            var updateItem = await _serviceManager.supplierServices.UpdateSupplierInActiveStatus(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }

        [HttpPost("UpdateSupplierApproveStatus")]
        public async Task<IActionResult> UpdateSupplierApproveStatus(UpdateSupplierApproveStatusRequest requestData)
        {
            var updateItem = await _serviceManager.supplierServices.UpdateSupplierApproveStatus(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }

        #endregion
    }
}
