using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class AddEditACHWireResponse
    {
        public string SupplierFinancialSettings { get; set; }
        public string BeneficiaryDetails { get; set; }
        public string BankDetails { get; set; }
        public string OtherDetails { get; set; }
        public int? SupplierId { get; set; }
    }

}
