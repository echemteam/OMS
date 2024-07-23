using OMS.Application.Services.Implementation;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.SupplierAccoutingSetting
{
    public class SupplierAccoutingSettingService : BaseServices, ISupplierAccoutingSettingService
    {
        #region variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public SupplierAccoutingSettingService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        #region Supplier Accouting Setting Service
        #endregion
    }
}
