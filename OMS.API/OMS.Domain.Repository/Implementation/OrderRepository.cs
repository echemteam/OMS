using Dapper;
using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Entities.Entity.OrderDocument;
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
        const string GETORDERITEMSBYORDERID="GetOrderItemsByOrderId";
        const string GETORDERDETAILBYORDERID = "GetOrderDetailByOrderId";
        const string GETORDERADDRESSESBYORDERID = "GetOrderAddressesByOrderId";
        const string GETORDERCONTACTBYORDERID = "GetOrderContactByOrderId";
        const string GETORDERDOCUMENTBYORDERID = "GetOrderDocumentByOrderId";
        const string DELETEORDERDATA = "DeleteOrderData";

        const string ADDORDERDOCUMENTS = "AddOrderDocuments";
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

        public async Task<EntityList<OrderListResponse>> GetOrders(GetOrderRequest request)
        {
            return await _context.GetListSP<OrderListResponse>(GETORDERS, new
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
        public async Task<List<GetOrderItemsByOrderIdResponse>> GetOrderItemsByOrderId(int orderId)
        {
            List<GetOrderItemsByOrderIdResponse> orderItemDetails = await _context.GetList<GetOrderItemsByOrderIdResponse>(GETORDERITEMSBYORDERID, new
            {
                orderId
            }, CommandType.StoredProcedure);
            return orderItemDetails;
        }

        public async Task<GetOrderDetailByOrderIdResponse> GetOrderDetailByOrderId(int orderId)
        {
            GetOrderDetailByOrderIdResponse orderDetails = await _context.GetFrist<GetOrderDetailByOrderIdResponse>(GETORDERDETAILBYORDERID, new
            {
                orderId
            }, commandType: CommandType.StoredProcedure);
            return orderDetails;
        }

        public async Task<AddressResponse> GetOrderAddressesByOrderId(int addressId)
        {
            AddressResponse addressDetails = await _context.GetFrist<AddressResponse>(GETORDERADDRESSESBYORDERID, new
            {
                addressId
            }, commandType: CommandType.StoredProcedure);
            return addressDetails;
        }

        public async Task<List<GetOrderContactByOrderIdResponse>> GetOrderContactByOrderId(int orderId)
        {
            List<GetOrderContactByOrderIdResponse> contactDetails = await _context.GetList<GetOrderContactByOrderIdResponse> (GETORDERCONTACTBYORDERID, new
            {
                orderId
            }, CommandType.StoredProcedure);
            return contactDetails;
        }

        public async Task<List<GetOrderDocumentByOrderIdResponse>> GetOrderDocumentByOrderId(int orderId)
        {
            List<GetOrderDocumentByOrderIdResponse> contactDetails = await _context.GetList<GetOrderDocumentByOrderIdResponse>(GETORDERDOCUMENTBYORDERID, new
            {
                orderId
            }, CommandType.StoredProcedure);
            return contactDetails;
        }
        public async Task<AddEntityDto<int>> DeleteOrder(int orderId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETEORDERDATA, new
            {
                orderId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> AddOrderDocuments(OrderDocumentDto orderDocumentsDto, DataTable documentDataTable)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDORDERDOCUMENTS, new
            {
                orderDocumentsDto.OrderId,
                OrderList = documentDataTable.AsTableValuedParameter("[dbo].[OrderTypeTable]"),
                orderDocumentsDto.CreatedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
