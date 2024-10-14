using Dapper;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderAddress;
using OMS.Domain.Entities.Entity.OrderItems;
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

        public async Task<AddEntityDto<int>> AddOrderItem(OrderItemsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDORDERITEM, new
            {
                requestData.OrderId,
                requestData.CatalogId,
                requestData.CasNumber,
                requestData.MdlNumber,
                requestData.ChemicalName,
                requestData.RequestDate,
                requestData.PromiseDate,
                requestData.OrderPriority,
                requestData.ReferenceEntityId,
                //requestData.OrderItemStatusId,
                //requestData.OrderItemSubStatusId,
                requestData.Quantity,
                requestData.PackSize,
                requestData.Unit,
                requestData.ItemUnitPrice,
                requestData.PoItemUnitPrice,
                requestData.SubTotalPrice,
                requestData.SubTotalPOPrice,
                requestData.OrderDisputTypeId,
                requestData.OrderTimeCancelReason,
                requestData.EntityType,
                requestData.Note,
                requestData.EntityId,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
    }
}
