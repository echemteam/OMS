using OMS.Domain.Entities.API.Response.Roles;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Roles;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IRolesRepository
    {
        Task<AddEntityDTO<int>> AddRoles(RolesDTO roles);
        Task<AddEntityDTO<int>> UpdateRoles(RolesDTO updateRoles);
        Task<AddEntityDTO<int>> DeleteRoles(int roleId, int deletedBy);
        Task<EntityList<GetRolesListResponse>> GetRoles(ListEntityRequest<BaseFilter> requestData);
        Task<GetRolesResponse> GetRoleByRoleId(int roleId);
    }
}
