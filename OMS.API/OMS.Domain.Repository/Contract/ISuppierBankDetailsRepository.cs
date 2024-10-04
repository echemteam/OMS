using OMS.Domain.Entities.API.Response.SuppierBankDetails;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SuppierBankDetails;

namespace OMS.Domain.Repository.Contract
{
    public interface ISuppierBankDetailsRepository
    {
        Task<AddEntityDto<int>> AddEditACHWire(SuppierBankDetailsDto requestData);
        Task<BeneficiaryDetailsResponse> GetBeneficiaryDetailsAddressByAddressId(int? addressId);
        Task<BankDetailsResponse> GetBankDetailsAddressByAddressId(int? addressId);
    }
}
