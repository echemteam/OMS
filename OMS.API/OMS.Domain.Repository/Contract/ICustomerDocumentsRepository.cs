using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerDocumentsRepository
    {
        Task<AddEntityDTO<int>> AddCustomerDocuments(CustomerDocumentsDTO customerDocuments);
        Task<List<GetCustomerDocumentsByIdResponse>> GetCustomerDocumentsById(int customerId);
        Task<AddEntityDTO<int>> DeleteCustomerDocumentsById(int customerDocumentId, int deletedBy);
    }
}
