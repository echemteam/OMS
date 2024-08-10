using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    //[CheckClientIpActionFilter]
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


        [HttpPost("UpdateSupplierStatus")]
        public async Task<IActionResult> UpdateSupplierStatus(UpdateSupplierStatusRequest requestData)
        {
            var updateItem = await _serviceManager.supplierServices.UpdateSupplierStatus(requestData, CurrentUserId);
            return APISucessResponce(updateItem);
        }

        [HttpPost("CheckSupplierNameExist")]
        public async Task<IActionResult> CheckSupplierNameExist(CheckSupplierNameExistRequest requestData)
        {
            var checkItem = await _serviceManager.supplierServices.CheckSupplierNameExist(requestData);
            return APISucessResponce(checkItem);
        }


        [HttpPost("GetSupplierAuditHistoryBySupplierId")]
        public async Task<IActionResult> GetSupplierAuditHistoryBySupplierId(GetSupplierAuditHistoryBySupplierIdRequest queryRequest)
        {
            var supplierAuditHistory = await _serviceManager.supplierServices.GetSupplierAuditHistoryBySupplierId(queryRequest);
            return APISucessResponce<object>(supplierAuditHistory);
        }

        [HttpGet("GetSupplierDetailsBySupplierName")]
        public async Task<IActionResult> GetSupplierDetailsBySupplierName(string supplierName)
        {
            if (supplierName != null)
            {
                List<GetSupplierDetailsBySupplierNameResponse> responseData = await _serviceManager.supplierServices.GetSupplierDetailsBySupplierName(supplierName).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(supplierName);
        }
        #endregion
    }
}
