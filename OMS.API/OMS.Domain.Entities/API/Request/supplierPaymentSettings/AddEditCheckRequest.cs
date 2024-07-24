using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;

namespace OMS.Domain.Entities.API.Request.supplierPaymentSettings
{
    public class AddEditCheckRequest
    {
        public SupplierFinancialSettingsRequest? SupplierFinancialSettings { get; set; }
        public int? SupplierPaymentSettingId { get; set; }
        public int? SupplierId { get; set; }
        public int? CheckMailingAddressId { get; set; }
        public AddEditAddressRequest? MailingAddress { get; set; }
    }
}
