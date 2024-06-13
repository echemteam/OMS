using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerDocumentsRepository
    {
        Task<AddEntityDTO<int>> AddCustomerDocuments(CustomerDocumentsDTO customerDocuments);
    }
}
