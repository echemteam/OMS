using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.CustomerDocuments
{
    public interface ICustomerDocumentsService
    {
        Task<AddEntityDto<int>> AddCustomerDocuments(AddCustomerDocumentsRequest requestData, short CurrentUserId);
        Task<List<GetCustomerDocumentsByIdResponse>> GetCustomerDocumentsById(int customerId);
        Task<AddEntityDto<int>> DeleteCustomerDocumentsById(int customerDocumentId, int deletedBy);
    }
}
