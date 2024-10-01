using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Customers
{
    public class GetSearchCustomersDetailsByNameEmailWebsiteRequest
    {
        public string? CustomerName { get; set; }
        public string? Website { get; set; }
        public string? EmailAddress { get; set; }
    }
}
