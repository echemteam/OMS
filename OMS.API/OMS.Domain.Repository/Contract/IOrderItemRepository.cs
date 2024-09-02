using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderDocument;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrderItemRepository
    {
        Task<AddEntityDto<int>> AddOrderItem(DataTable orderItemsListDataTable, OrderDocumentDto requestData);
    }
}
