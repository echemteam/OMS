using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class GetSearchSuppliersDetailsByNameEmailWebsiteRequest
    {
        public string? SupplierName { get; set; }
        public string? Website { get; set; }
        public string? EmailAddress { get; set; }
    }
}
