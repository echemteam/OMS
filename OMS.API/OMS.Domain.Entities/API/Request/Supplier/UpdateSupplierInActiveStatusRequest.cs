using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class UpdateSupplierInActiveStatusRequest
    {
        public int? SupplierId { get; set; }
        public short? StatusId { get; set; }
        public string? InActiveReason { get; set; }
    }
}
