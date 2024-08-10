using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Orders;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrderRepository : BaseRepository<Orders>, IOrderRepository
    {
        #region SP Name
        const string CHECKPONUMBEREXISTORNOT = "CheckPoNumberExistOrNot";
        const string GETPONUMBERDETAILSBYPONUMBER = "GetPoNumberDetailsByPoNumber";
        const string ADDEDITORDERINFORMATION = "AddEditOrderInformation";
        const string ADDEDITORDERCONTACTINFORMATION = "AddEditOrderContactInformation";
        const string ADDEDITORDERADDRESSINFORMATION = "AddEditOrderAddressInformation";
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
        public async Task<AddEntityDto<int>> AddEditOrderInformation(OrderDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITORDERINFORMATION, new
            {
                requestData.OrderId,
                requestData.OrderMethodId,
                requestData.CustomerId,
                requestData.SubCustomerId,
                requestData.PoNumber,
                requestData.OrderReceivedDate,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> AddEditOrderAddressInformation(OrderAddressDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITORDERADDRESSINFORMATION, new
            {
                requestData.OrderAddressId,
                requestData.OrderId,
                requestData.BillingAddressId,
                requestData.ShippingAddressId,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> AddEditOrderContactInformation(OrderDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITORDERCONTACTINFORMATION, new
            {
                requestData.OrderId,
                requestData.IsEndUser,
                requestData.EndUserContactId,
                requestData.IsInvoiceSubmission,
                requestData.InvoiceSubmissionContactId,
                requestData.IsPurchasing,
                requestData.PurchasingContactId,
                requestData.ReferenceNumber,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
