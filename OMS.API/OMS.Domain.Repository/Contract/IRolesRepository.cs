using OMS.Domain.Entities.API.Response.Roles;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Roles;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IRolesRepository
    {
        Task<AddEntityDto<int>> AddRoles(RolesDto roles);
        Task<AddEntityDto<int>> UpdateRoles(RolesDto updateRoles);
        Task<AddEntityDto<int>> DeleteRoles(int roleId, int deletedBy);
        Task<EntityList<GetRolesListResponse>> GetRoles(ListEntityRequest<BaseFilter> requestData);
        Task<GetRolesResponse> GetRoleByRoleId(int roleId);
    }
}
