using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Supplier
{
    public interface ISupplierServices
    {
        Task<AddEntityDTO<int>> AddEditSupplierBasicInformation(AddEditSupplierBasicInformationRequest requestData, short CurrentUserId);
    }
}
