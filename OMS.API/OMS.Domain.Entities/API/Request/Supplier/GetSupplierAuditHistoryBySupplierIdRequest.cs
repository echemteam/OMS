﻿using OMS.Domain.Entities.Entity.CommonEntity;
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
        public string? EventName { get; set; }
        public string? UserId { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? FromDate { get; set; }
    }
}
