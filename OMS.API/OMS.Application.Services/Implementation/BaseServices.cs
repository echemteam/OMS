using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Implementation
{
    public class BaseServices
    {
        private readonly IRepositoryManager _repositoryManager;
        private ICommonSettingService _commonSettingService;
        public BaseServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices)
        {
            _repositoryManager = _repoManager;
            _commonSettingService = commonSettingServices;
        }

        public IRepositoryManager repositoryManager => _repositoryManager;
        public ICommonSettingService commonSettingService => _commonSettingService;
    }
}
