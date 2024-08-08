using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.SupplierDocuements;
using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
    public class SupplierDocuementsController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public SupplierDocuementsController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion-

        #region API
        [HttpPost("AddSupplierDocuments")]
        public async Task<IActionResult> AddSupplierDocuments(AddSupplierDocumentsRequest requestData)
        {
            var addItem = await _serviceManager.supplierDocuementsService.AddSupplierDocuments(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }
        [HttpGet("GetSupplierDocumentsById")]
        public async Task<IActionResult> GetSupplierDocumentsById(int supplierId)
        {
            if (supplierId > 0)
            {
                List<GetSupplierDocumentsByIdResponse> responseData = await _serviceManager.supplierDocuementsService.GetSupplierDocumentsById(supplierId).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(supplierId);
        }
        [HttpDelete("DeleteSupplierDocumentsById")]
        public async Task<IActionResult> DeleteSupplierDocumentsById(int supplierDocumentId)
        {
            if (supplierDocumentId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.supplierDocuementsService.DeleteSupplierDocumentsById(supplierDocumentId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(supplierDocumentId);
        }
        #endregion
    }
}
