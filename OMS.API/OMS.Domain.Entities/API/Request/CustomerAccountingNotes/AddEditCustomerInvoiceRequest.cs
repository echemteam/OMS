using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.CustomerAccountingNotes
{
    public class AddEditCustomerInvoiceRequest
    {
        public int CustomerAccountingSettingId { get; set; }
        public int CustomerId { get; set; }
        public string? InvoiceSubmissionInstruction { get; set; }
    }
}
