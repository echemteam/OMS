using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Roles;
using OMS.Domain.Entities.API.Response.Roles;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Roles;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Roles
{
    public class RolesServices : BaseServices, IRolesServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public RolesServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Roles Services
        public async Task<AddEntityDTO<int>> AddRoles(AddRolesRequest requestData, short CurrentUserId)
        {
            RolesDTO rolesDTO = requestData.ToMapp<AddRolesRequest, RolesDTO>();
            rolesDTO.CreatedBy = CurrentUserId;

            return await repositoryManager.roles.AddRoles(rolesDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateRoles(UpdateRolesRequest updateRolesRequest, short CurrentUserId)
        {
            RolesDTO rolesDTO = updateRolesRequest.ToMapp<UpdateRolesRequest, RolesDTO>();
            rolesDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.roles.UpdateRoles(rolesDTO);
        }

        public async Task<AddEntityDTO<int>> DeleteRoles(int roleId, int deletedBy)
        {
            return await repositoryManager.roles.DeleteRoles(roleId, deletedBy);
        }

        public async Task<EntityList<GetRolesListResponse>> GetRoles(ListEntityRequest<BaseFilter> requestData)
        {
            var rolesDetails = await repositoryManager.roles.GetRoles(requestData);
            return rolesDetails;
        }

        public async Task<GetRolesResponse> GetRoleByRoleId(int roleId)
        {
            return await repositoryManager.roles.GetRoleByRoleId(roleId);
        }
        #endregion
    }
}
