using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Orders;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrderRepository : BaseRepository<Orders>, IOrderRepository
    {
        #region SP Name
        const string CHECKPONUMBEREXISTORNOT = "CheckPoNumberExistOrNot";
        const string GETPONUMBERDETAILSBYPONUMBER = "GetPoNumberDetailsByPoNumber";
        const string ADDORDER = "AddOrder";
        const string GETORDERS = "GetOrders";
        #endregion

        public OrderRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Order Repository
        public async Task<AddEntityDto<int>> CheckPoNumberExistOrNot(OrderDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(CHECKPONUMBEREXISTORNOT, new
            {
                requestData.CustomerId,
                requestData.PoNumber,
            }, CommandType.StoredProcedure);
        }
        public async Task<List<GetPoNumberDetailsByPoNumberResponse>> GetPoNumberDetailsByPoNumber(string poNumber)
        {
            List<GetPoNumberDetailsByPoNumberResponse> poNumberDetails = await _context.GetList<GetPoNumberDetailsByPoNumberResponse>(GETPONUMBERDETAILSBYPONUMBER, new
            {
                poNumber
            }, CommandType.StoredProcedure);
            return poNumberDetails;
        }
        public async Task<AddEntityDto<int>> AddOrder(OrderDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDORDER, new
            {
                requestData.OrderMethodId,
                requestData.CustomerId,
                requestData.SubCustomerId,
                requestData.PoNumber,
                requestData.PoDate,
                requestData.OrderReceivedDate,
                requestData.IsEndUser,
                requestData.IsInvoiceSubmission,
                requestData.IsPurchasing,
                requestData.ReferenceNumber,
                requestData.PO_TotalOrderAmount,
                requestData.CurrencyId,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetOrderResponse>> GetOrders(GetOrderRequest request)
        {
            return await _context.GetListSP<GetOrderResponse>(GETORDERS, new
            {
                request.OrderStatusId,
                request.OrderSubStatusId,
                request.OrderItemStatusId,
                request.Pagination!.PageNumber,
                request.Pagination.PageSize,
                request.Filters?.SearchText,
                request.SortString
            }, true);
        }

        #endregion
    }
}
