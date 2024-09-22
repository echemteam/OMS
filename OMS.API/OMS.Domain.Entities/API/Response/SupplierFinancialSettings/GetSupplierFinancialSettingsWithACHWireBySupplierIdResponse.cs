using OMS.Domain.Entities.API.Request.SupplierFinancialSettings;
using OMS.Domain.Entities.API.Response.SuppierBankDetails;

namespace OMS.Domain.Entities.API.Response.SupplierFinancialSettings
{
    public class GetSupplierFinancialSettingsWithACHWireBySupplierIdResponse
    {
        public GetSupplierFinancialSettingsBySupplierIdResponse? SupplierFinancialSettings { get; set; }
        public GetACHWireBySupplierIdResponse OtherDetails { set; get; }

        //public SupplierFinancialSettingsRequest? SupplierFinancialSettings { get; set; }
        public BeneficiaryDetailsResponse? BeneficiaryDetails { get; set; }
        public BankDetailsResponse? BankDetails { get; set; }
        //public OtherDetailsRequest? OtherDetails { get; set; }

    }
}
