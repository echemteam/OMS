using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.RoleMapping;
using OMS.Domain.Entities.API.Response.RoleMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.RoleMapping;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.RolesMapping
{
    public class RolesMappingServices : BaseServices, IRolesMappingServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public RolesMappingServices(IRepositoryManager _repoManager, ICommonSettingService _commonSettingServices) : base(_repoManager, _commonSettingServices)
        {

        }
        #endregion

        #region Roles Mapping Service 
        public async Task<AddEntityDto<int>> AddRoleMapping(AddRoleMappingRequest requestData, short CurrentUserId)
        {
            RoleMappingDto user = requestData.ToMapp<AddRoleMappingRequest, RoleMappingDto>();
            user.CreatedBy = CurrentUserId;
            return await repositoryManager.rolesMapping.AddRoleMapping(user);
        }

        public async Task<EntityList<GetRolesMappingByRoleIdResponse>> GetRolesMappingByRoleId(GetRolesMappingByRoleIdRequest requestData)
        {
            var rolesDetails = await repositoryManager.rolesMapping.GetRolesMappingByRoleId(requestData);
            return rolesDetails;
        }

        public async Task<AddEntityDto<int>> DeleteRolesMapping(int userRoleId, int deletedBy)
        {
            return await repositoryManager.rolesMapping.DeleteRolesMapping(userRoleId, deletedBy);
        }
        #endregion
    }
}
