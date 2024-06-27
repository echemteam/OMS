using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Approval
{
    public  class ValidateRequest
    {
        public int CustomerId { get; set; }
        public int SupplierId { get; set; }
    }
}
