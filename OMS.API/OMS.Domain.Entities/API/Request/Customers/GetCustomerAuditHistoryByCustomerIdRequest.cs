using OMS.Domain.Entities.Entity.CommonEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Customers
{
    public class GetCustomerAuditHistoryByCustomerIdRequest : ListEntityRequest<BaseFilter>
    {
        public int CustomerId { get; set; }
    }
}
