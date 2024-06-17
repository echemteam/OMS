using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.FileManger.Services;
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

        [HttpGet("GetCustomerDocumentsById")]
        public async Task<IActionResult> GetCustomerDocumentsById(int customerId)
        {
            if (customerId > 0)
            {
                List<GetCustomerDocumentsByIdResponse> responseData = await _serviceManager.customerDocumentsService.GetCustomerDocumentsById(customerId).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(customerId);
        }


        [HttpDelete("DeleteCustomerDocumentsById")]
        public async Task<IActionResult> DeleteCustomerDocumentsById(int customerDocumentId)
        {
            if (customerDocumentId > 0)
            {
                int deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.customerDocumentsService.DeleteCustomerDocumentsById(customerDocumentId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(customerDocumentId);
        }

        [HttpGet("DownloadCustomerDocument")]
        public async Task<IActionResult> DownloadCustomerDocument(string folderName, string fileName, int customerId)
        {

            byte[] decryptedBytes = await _serviceManager.customerDocumentsService.DownloadCustomerDocument(folderName, fileName, customerId);
            if (decryptedBytes == null)
            {
                return APISucessResponce("File not found.");
            }
            var memory = new MemoryStream(decryptedBytes)
            {
                Position = 0
            };

            string ext = FileManager.GetExtension(fileName);
            string mimeType = FileManager.GetMimeType(ext);
            var contentType = mimeType;

            return File(memory, contentType, fileName);
        }

        #endregion

    }
}
