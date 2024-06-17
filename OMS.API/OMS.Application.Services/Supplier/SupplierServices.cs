using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Supplier;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Supplier
{
    public class SupplierServices : BaseServices, ISupplierServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public SupplierServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Supplier Services
        public async Task<AddEntityDTO<int>> AddEditSupplierBasicInformation(AddEditSupplierBasicInformationRequest requestData, short CurrentUserId)
        {
            SupplierDTO supplierDTO = requestData.ToMapp<AddEditSupplierBasicInformationRequest, SupplierDTO>();
            supplierDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.supplier.AddEditSupplierBasicInformation(supplierDTO);
        }
        #endregion

    }
}
