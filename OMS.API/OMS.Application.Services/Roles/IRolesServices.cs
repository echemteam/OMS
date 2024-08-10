using OMS.Domain.Entities.API.Request.Roles;
using OMS.Domain.Entities.API.Response.Roles;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Roles
{
    public interface IRolesServices
    {
        Task<AddEntityDto<int>> AddRoles(AddRolesRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateRoles(UpdateRolesRequest updateRolesRequest, short CurrentUserId);
        Task<AddEntityDto<int>> DeleteRoles(int roleId, int deletedBy);
        Task<EntityList<GetRolesListResponse>> GetRoles(ListEntityRequest<BaseFilter> requestData);
        Task<GetRolesResponse> GetRoleByRoleId(int roleId);
    }
}
