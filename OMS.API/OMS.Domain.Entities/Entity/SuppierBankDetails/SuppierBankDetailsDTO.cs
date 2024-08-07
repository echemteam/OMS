namespace OMS.Domain.Entities.Entity.SuppierBankDetails
{
    public class SuppierBankDetailsDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
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
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
        public bool? IsActive { get; set; }
    }
}
