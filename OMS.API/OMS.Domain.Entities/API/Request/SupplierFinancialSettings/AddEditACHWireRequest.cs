using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;

namespace OMS.Domain.Entities.API.Request.SupplierAccoutingSetting
{
    public class AddEditACHWireRequest
    {
        public SupplierFinancialSettingsRequest? SupplierFinancialSettings { get; set; }
        public AddEditAddressRequest? BankAddress { get; set; }
        public AddEditAddressRequest? RecipientAddress { get; set; }
        public int? SupplierBankDetailsId { get; set; }
        public int? BankAddressId { get; set; }
        public int? RecipientAddressId { get; set; }
        public string? MessageToRecipient { get; set; }
        public int? SupplierId { get; set; }
        public bool? IsAddressInUs { get; set; }
        public string? RecipientPhoneNumber { get; set; }
        public string? MessageToRecipientBank { get; set; }
        public string? BeneficiaryName { get; set; }
        public string? BankName { get; set; }
        public string? AccountType { get; set; }
        public string? AccountNumber { get; set; }
        public string? BranchCode { get; set; }
        public string? IbanNumber { get; set; }
        public string? SwiftCode { get; set; }
        public string? RoutingNumber { get; set; }
        public string? SortCode { get; set; }
        public string? BsbNumber { get; set; }
        public bool? IsActive { get; set; }
    }
}
