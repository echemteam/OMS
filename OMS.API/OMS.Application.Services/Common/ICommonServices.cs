using OMS.Domain.Entities.API.Response.Common;

namespace OMS.Application.Services.Common
{
    public interface ICommonServices
    {
        Task<List<GetAllRolesResponse>> GetAllRoles();
        Task<List<GetUnAssignedUserByRoleIdResponse>> GetUnAssignedUserByRoleId(byte roleId);
    }
}
