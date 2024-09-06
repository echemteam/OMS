using ClientIPAuthentication;
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
    //[CheckClientIpActionFilter]
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
        #endregion


        [HttpPost("DownloadApprovalRequestDocument")]
        public IActionResult DownloadApprovalRequestDocument(ApproveDownloadDocumentRequest request)
        {
            // Check if the request or its properties are null
            if (request == null || string.IsNullOrEmpty(request.Base64FileData) || string.IsNullOrEmpty(request.FileName))
            {
                // Return a BadRequest or a suitable response when input is invalid
                return BadRequest("Invalid request data.");
            }

            // Convert base64 string to byte array
            byte[] fileBytes = ConvertBase64ToFile(request.Base64FileData);

            if (fileBytes != null)
            {
                // Determine file extension and MIME type
                string ext = FileManager.GetExtension(request.FileName); // Ensure FileManager can handle this
                string mimeType = FileManager.GetMimeType(ext);
                var contentType = mimeType ?? "application/octet-stream"; // Fallback MIME type

                // Return the file to the client
                return File(fileBytes, contentType, request.FileName);
                //return APISucessResponce(File(fileBytes, contentType, request.FileName), "DownloadDocument");
            }

            // Return an empty file or handle error as needed
            //return 
            return APISucessResponce<object>(File(Array.Empty<byte>(), "application/octet-stream", request.FileName));
        }

        //[HttpGet("DownloadApprovalRequestDocument")]
        //public IActionResult DownloadApprovalRequestDocument(string Base64FileData,string FileName)
        //{
        //    // Check if the request or its properties are null
        //    if (string.IsNullOrEmpty(Base64FileData) || string.IsNullOrEmpty(FileName))
        //    {
        //        // Return a BadRequest or a suitable response when input is invalid
        //        return BadRequest("Invalid request data.");
        //    }

        //    // Convert base64 string to byte array
        //    byte[] fileBytes = ConvertBase64ToFile(Base64FileData);

        //    if (fileBytes != null)
        //    {
        //        // Determine file extension and MIME type
        //        string ext = FileManager.GetExtension(FileName); // Ensure FileManager can handle this
        //        string mimeType = FileManager.GetMimeType(ext);
        //        var contentType = mimeType ?? "application/octet-stream"; // Fallback MIME type

        //        // Return the file to the client
        //        return File(fileBytes, contentType, FileName);
        //    }

        //    // Return an empty file or handle error as needed
        //    return File(Array.Empty<byte>(), "application/octet-stream", FileName);
        //}

        public static byte[] ConvertBase64ToFile(string base64FileData)
        {
            // Extract base64 data if necessary
            string base64Data = base64FileData.Replace("data:text/plain;base64,", ""); // Adjust MIME type if needed

            // Decode the base64 data to bytes
            return Convert.FromBase64String(base64Data);
        }
    }
}
