using OMS.Application.Services.Implementation;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.ApprovalConfiguration
{
    public class ApprovalConfigurationServices : BaseServices, IApprovalConfigurationServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public ApprovalConfigurationServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Approval Configuration Services
        #endregion
    }
}
