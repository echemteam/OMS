using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetOrderHistoryByOrderIdResponse
    {
        public int? OrderHistoryId {  get; set; }
        public string? Description {  get; set; }
        public DateTime? ChangedAt {get; set; }
        public int? ChangedBy {  get; set; }
        public string? FullName {  get; set; }

    }
}
