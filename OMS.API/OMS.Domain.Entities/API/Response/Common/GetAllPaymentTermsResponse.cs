using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllPaymentTermsResponse
    {
        public short? PaymentTermId {  get; set; }
        public string? PaymentTerm {  get; set; }
    }
}
