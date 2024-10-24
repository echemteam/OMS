﻿using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderAddress;
using OMS.Domain.Entities.Entity.OrderContacts;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrderContactRepository
    {
        Task<AddEntityDto<int>> AddOrderContact(DataTable orderContactsListDataTable);
        Task<AddEntityDto<int>> UpdateOrderContact(OrderContactsDto requestData);

    }
}
