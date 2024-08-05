using OMS.Domain.Entities.API.Response.Address;

namespace OMS.Domain.Entities.API.Response.supplierPaymentSettings
{
    public class GetPaymentSettingsBySupplierIdResponse
    {
        public int? SupplierPaymentSettingId { get; set; }
        public int? SupplierId { get; set; }
        public string? CCNote { get; set; }
        public bool? IsCCExistsOnFile { get; set; }
        public int? CheckMailingAddressId { get; set; }
        public string? OtherNote { get; set; }
        public GetAddressResponse? MailingAddress { get; set; }
    }
}
