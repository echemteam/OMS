using OMS.Domain.Entities.API.Response.Security;
using OMS.Domain.Entities.API.Response.SecuritySetting;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface ISecurityPermissionRepository
    {
        Task<List<GetSecurityPermissionByUserIdResponse>> GetSecurityPermissionByUserId(short? userId);
        Task<List<GetAllPagesByRoleIdResponse>> GetAllPagesByRoleId(int id);
        Task<bool> AddSecurityPermissions(DataTable tbl, short? CurrentUserId);
    }
}
