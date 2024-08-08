using OMS.Domain.Entities.API.Response.Customers;
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
        #endregion
    }
}
