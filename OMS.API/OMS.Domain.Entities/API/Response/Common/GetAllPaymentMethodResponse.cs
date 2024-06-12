using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllPaymentMethodResponse
    { 
        public short? PaymentMethodId { get; set; }
        public string? Method {  get; set; }
    }
}
