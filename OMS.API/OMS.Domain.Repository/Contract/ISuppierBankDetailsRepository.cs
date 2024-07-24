using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SuppierBankDetails;

namespace OMS.Domain.Repository.Contract
{
    public interface ISuppierBankDetailsRepository
    {
        Task<AddEntityDTO<int>> AddEditACHWire(SuppierBankDetailsDTO requestData);
    }
}
