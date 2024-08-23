using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerDocumentsRepository
    {
        Task<AddEntityDto<int>> CheckDocumentsExistOrNot(byte? documentTypeId, string? name, int? customerId);
        Task<AddEntityDto<int>> AddCustomerDocuments(CustomerDocumentsDto customerDocuments,DataTable documentDataTable);
        Task<List<GetCustomerDocumentsByIdResponse>> GetCustomerDocumentsById(int customerId);
        Task<AddEntityDto<int>> DeleteCustomerDocumentsById(int customerDocumentId, int deletedBy);
    }
}
