﻿using Dapper;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrderContactRepository : BaseRepository<OrderContacts>, IOrderContactRepository
    {
        #region SP Name
        const string ADDORDERCONTACTINFORMATION = "AddOrderContactInformation";
        const string ADDORDERCONTACT = "AddOrderContact";
        #endregion

        public OrderContactRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<AddEntityDto<int>> AddOrderContact(DataTable orderContactsListDataTable)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDORDERCONTACT, new
            {
                orderContactList = orderContactsListDataTable.AsTableValuedParameter("[dbo].[OrderContactsTypeTable]"),
            }, CommandType.StoredProcedure);
        }
    }
}