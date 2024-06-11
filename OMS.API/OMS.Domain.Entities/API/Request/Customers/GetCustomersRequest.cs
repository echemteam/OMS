﻿using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.Customers
{
    public class GetCustomersRequest : ListEntityRequest<BaseFilter>
    {
        public short? StatusId { get; set; }
    }
}
