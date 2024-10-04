using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Orders
{
    public class OrderListResponse
    {
        public int? OrderId { get; set; }
        public byte? OrderMethodId { get; set; }
        public string? OrderMethod { get; set; }
        public int? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public int? SubCustomerId { get; set; }
        public string? SubCustomerName { get; set; }
        public string? PoNumber { get; set; }
        public DateTime? OrderReceivedDate { get; set; }
        public byte? Items { get; set; }
        public decimal? ItemsTotal { get; set; }
    }
}
