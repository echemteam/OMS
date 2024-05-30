using OMS.Domain.Entities.API.Response.Common;

namespace OMS.Domain.Repository.Contract
{
    public interface ICommonRepository
    {
        Task<List<GetAllRolesResponse>> GetAllRoles();
        Task<List<GetUnAssignedUserByRoleIdResponse>> GetUnAssignedUserByRoleId(byte roleId);
    }
}
