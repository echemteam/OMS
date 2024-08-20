using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class AddEditResponsibleUserForSupplierRequest
    {
        public int? SupplierId { get; set; }
        public string? UserId { get; set; }
    }
}
