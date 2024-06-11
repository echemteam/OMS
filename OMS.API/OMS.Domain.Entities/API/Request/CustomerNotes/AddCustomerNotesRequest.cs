using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.CustomerNotes
{
    public  class AddCustomerNotesRequest
    {
        public int? CustomerId { get; set; }
        public string? Note { get; set; }
    }
}
