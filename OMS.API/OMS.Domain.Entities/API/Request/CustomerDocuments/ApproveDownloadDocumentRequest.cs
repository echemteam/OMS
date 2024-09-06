namespace OMS.Domain.Entities.API.Request.CustomerDocuments
{
    public class ApproveDownloadDocumentRequest
    {
        public string? Base64FileData { get; set; }  
        public string? FileName { get; set; }  
    }
}
