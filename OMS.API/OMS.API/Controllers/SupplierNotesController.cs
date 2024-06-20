using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.CustomerNotes;
using OMS.Domain.Entities.API.Request.SupplierNotes;
using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.API.Response.SupplierNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierNotesController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        public SupplierNotesController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }

        [HttpPost("AddSupplierNotes")]
        public async Task<IActionResult> AddSupplierNotes(AddSupplierNotesRequest requestData)
        {

            var addNotes = await _serviceManager.supplierNotesService.AddSupplierNotes(requestData, CurrentUserId);
            return APISucessResponce(addNotes);
        }
        [HttpGet("GetSupplierNotesBySupplierId")]

        public async Task<IActionResult> GetSupplierNotesBySupplierId(int supplierId)
        {
            List<GetSupplierNotesBySupplierIdResponse> responseData = await _serviceManager.supplierNotesService.GetSupplierNotesBySupplierId(supplierId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpPost("UpdateSupplierNotes")]
        public async Task<IActionResult> UpdateSupplierNotes(UpdateSupplierNotesRequest requestData)
        {
            AddEntityDTO<long> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.supplierNotesService.UpdateSupplierNotes(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
        }

        #endregion
    }
}
