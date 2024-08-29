using Dapper;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderDocument;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrderItemRepository : BaseRepository<OrderItems>, IOrderItemRepository
    {
        #region SP Name
        const string ADDORDERITEMINFORMATION = "AddOrderItemInformation";
        const string ADDORDERITEM = "AddOrderItem";
        #endregion

        public OrderItemRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<AddEntityDto<int>> AddOrderItem(DataTable orderItemsListDataTable, OrderDocumentDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDORDERITEM, new
            {
                orderItemsList = orderItemsListDataTable.AsTableValuedParameter("[dbo].[OrderItemsTypeTable]"),
                requestData.OrderId,
                requestData.DocumentName,
                requestData.OrderItemId,
                requestData.DocumentType,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
    }
}
