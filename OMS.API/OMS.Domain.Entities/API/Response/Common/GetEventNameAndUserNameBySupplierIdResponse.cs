using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetEventNameAndUserNameBySupplierIdResponse
    {
        public string? EventName { get; set; }
        public string? UserName { get; set; }
    }
}
