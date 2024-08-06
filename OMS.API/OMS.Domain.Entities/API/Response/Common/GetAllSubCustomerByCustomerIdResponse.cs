using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllSubCustomerByCustomerIdResponse
    {
        public int? SubCustomerMainCustomerId { get; set; }
        public int? CustomerId { get; set; }
        public int? SubCustomerId { get; set; }
        public string? SubCustomerName { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? StatusId { get; set; }
        public string? StatusName { get; set; }
    }
}
