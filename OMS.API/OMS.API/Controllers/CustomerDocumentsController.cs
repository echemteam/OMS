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
        public async Task<IActionResult> GetCustomerDocumentsById(int CustomerId)
        {
            if (CustomerId > 0)
            {
                List<GetCustomerDocumentsByIdResponse> responseData = await _serviceManager.customerDocumentsService.GetCustomerDocumentsById(CustomerId).ConfigureAwait(true);
                return APISucessResponce<object>(responseData);
            }
            return APISucessResponce(CustomerId);
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

        //[HttpGet("DownloadCustomerDocument")]
        //public IActionResult DownloadCustomerDocument(string folderName, string fileName)
        //{
        //    var contentPath = _commonSettingService.ApplicationSettings.SaveFilePath;
        //    var filePath = Path.Combine(contentPath!, folderName, fileName);

        //    if (!System.IO.File.Exists(filePath))
        //    {
        //        return NotFound(); // Return 404 if the file is not found
        //    }

        //    var memory = new MemoryStream();
        //    using (var stream = new FileStream(filePath, FileMode.Open))
        //    {
        //        stream.CopyTo(memory);
        //    }
        //    memory.Position = 0;

        //    string ext = FileManager.GetExtension(fileName);
        //    string miniType = FileManager.GetMimeType(ext);
        //    var contentType = miniType; // You may need to set the appropriate content type based on your file type.
        //    // Return the file
        //    return File(memory, contentType, fileName);
        //}


        [HttpGet("DownloadCustomerDocument")]
        public async Task<IActionResult> DownloadCustomerDocument(string folderName, string fileName)
        {

            byte[] decryptedBytes = await _serviceManager.customerDocumentsService.DownloadCustomerDocument(folderName, fileName);

            var memory = new MemoryStream(decryptedBytes);
            memory.Position = 0;

            string ext = FileManager.GetExtension(fileName);
            string mimeType = FileManager.GetMimeType(ext);
            var contentType = mimeType; 

            return File(memory, contentType, fileName);
        }

        #endregion

    }
}
