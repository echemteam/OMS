using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.OrderContact
{
    public class UpdateOrderContactRequest
    {
        public int? OrderContactId {  get; set; }
        public int? OrderId { get; set; }
        public int? ContactId {  get; set; }
        public int? ContactTypeId {  get; set; }

    }
}
