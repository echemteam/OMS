using OMS.Domain.Entities.API.Response.Address;

namespace OMS.Domain.Entities.API.Response.SuppierBankDetails
{
    public class GetACHWireBySupplierIdResponse
    {
        public GetAddressResponse? BankAddress { get; set; }
        public GetAddressResponse? RecipientAddress { get; set; }
        public int? SupplierBankDetailsId { get; set; }
        public int? BankAddressId { get; set; }
        public int? RecipientAddressId { get; set; }
        public string? MessageToRecipient { get; set; }
        public int? SupplierId { get; set; }
        public bool? IsAddressInUs { get; set; }
        public string? RecipientPhoneNumber { get; set; }
        public byte? PaymentTermId { get; set; }
        public string? MessageToRecipientBank { get; set; }
        public string? BeneficiaryName { get; set; }
        public string? BankName { get; set; }
        public string? AccountType { get; set; }
        public string? AccountNumber { get; set; }
        public string? BranchCode { get; set; }
        public int? IbanNumber { get; set; }
        public string? SwiftCode { get; set; }
        public string? RoutingNumber { get; set; }
        public string? SortCode { get; set; }
        public string? BsbNumber { get; set; }
        public bool? IsActive { get; set; }
    }
}
