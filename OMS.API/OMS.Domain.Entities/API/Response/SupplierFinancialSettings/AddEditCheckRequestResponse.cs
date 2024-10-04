using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class AddEditCheckRequestResponse
    {
        public string? SupplierFinancialSettings { get; set; }
        public int? SupplierPaymentSettingId { get; set; }
        public int? SupplierId { get; set; }
        public int? CheckMailingAddressId { get; set; }
        public MailingAddressResponce? MailingAddress { get; set; }
    }
}
