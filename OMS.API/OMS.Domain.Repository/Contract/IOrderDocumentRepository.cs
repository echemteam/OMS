using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderDocument;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrderDocumentRepository
    {
        Task<AddEntityDto<int>> AddOrderDocumnet(OrderDocumentDto requestData);
    }
}
