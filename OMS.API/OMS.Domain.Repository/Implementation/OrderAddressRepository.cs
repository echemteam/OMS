﻿using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderAddress;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrderAddressRepository : BaseRepository<OrderAddress>, IOrderAddressRepository
    {
        #region SP Name
        const string ADDORDERADDRESS = "AddOrderAddress";
        const string UPDATEORDERADDRESS = "UpdateOrderAddress";
        #endregion

        public OrderAddressRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<AddEntityDto<int>> AddOrderAddress(OrderAddressDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDORDERADDRESS, new
            {
                requestData.OrderId,
                requestData.BillingAddressId,
                requestData.ShippingAddressId,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> UpdateOrderAddress(OrderAddressDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATEORDERADDRESS, new
            {
                requestData.OrderAddressId,
                requestData.OrderId,
                requestData.BillingAddressId,
                requestData.ShippingAddressId,
                requestData.OrderItemId,
                requestData.UpdatedBy,
            }, CommandType.StoredProcedure);
        }

    }
}
