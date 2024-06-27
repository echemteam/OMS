using OMS.Domain.Entities.Entity.CommonEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class GetSupplierAuditHistoryBySupplierIdRequest : ListEntityRequest<BaseFilter>
    {
        public int SupplierId { get; set; }
    }
}
