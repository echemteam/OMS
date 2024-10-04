using OMS.Domain.Entities.API.Request.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Orders
{
    public class AddOrderDocumentsRequest
    {
        public int? OrderId { get; set; }
        public string? StoragePath { get; set; }
        public List<OrderDocumentList>? DocumentOrderList { get; set; }
    }
}
