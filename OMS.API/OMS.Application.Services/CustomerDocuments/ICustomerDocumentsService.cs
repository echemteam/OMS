using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.CustomerDocuments
{
    public interface ICustomerDocumentsService
    {
        Task<AddEntityDTO<int>> AddCustomerDocuments(AddCustomerDocumentsRequest requestData, short CurrentUserId);
        Task<List<GetCustomerDocumentsByIdResponse>> GetCustomerDocumentsById(int customerId);
        Task<AddEntityDTO<int>> DeleteCustomerDocumentsById(int customerDocumentId, int deletedBy);
        Task<byte[]> DownloadCustomerDocument(string folderName, string fileName);
    }
}
