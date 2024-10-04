using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Supplier
{
    public class GetSearchSuppliersDetailsByNameEmailWebsiteResponse
    {
        public int? SupplierId { get; set; }
        public string? Name { get; set; }
        public string? GroupType { get; set; }
        public string? CountryName { get; set; }
        public string? EmailAddress { get; set; }
        public string? Website { get; set; }
        public string? TaxId { get; set; }
        public string? Status { get; set; }
        public string? Reason { get; set; }
    }
}
