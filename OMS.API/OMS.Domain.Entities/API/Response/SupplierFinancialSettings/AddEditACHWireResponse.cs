using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class AddEditACHWireResponse
    {
        public SupplierFinancialSettingsResponse SupplierFinancialSettings { get; set; }
        public BeneficiaryDetailsDataResponse BeneficiaryDetails { get; set; }
        public BankDetailsDataResponse BankDetails { get; set; }
        public OtherDetailsResponce OtherDetails { get; set; }
        public int? SupplierId { get; set; }
    }

}
