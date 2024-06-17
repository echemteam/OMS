using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Supplier;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierRepository
    {
        Task<AddEntityDTO<int>> AddEditSupplierBasicInformation(SupplierDTO supplier);
    }
}
