using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Repository;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Common
{
    public class CommonServices : BaseServices, ICommonServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public CommonServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        public Task<List<GetAllRolesResponse>> GetAllRoles()
        {
            return repositoryManager.commonRepository.GetAllRoles();
        }

        public Task<List<GetUnAssignedUserByRoleIdResponse>> GetUnAssignedUserByRoleId(byte roleId)
        {
            return repositoryManager.commonRepository.GetUnAssignedUserByRoleId(roleId);
        }

    }
}
