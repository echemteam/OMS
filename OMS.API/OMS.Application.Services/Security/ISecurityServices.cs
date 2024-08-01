using OMS.Domain.Entities.API.Request.Security;
using OMS.Domain.Entities.API.Response.Security;

namespace OMS.Application.Services.Security
{
    public interface ISecurityServices
    {
        Task<List<GetAllPagesByRoleIdResponse>> GetAllPagesByRoleId(int id);
        Task<bool> AddSecurityPermissions(AddSecurityPermissionsRequestList requestData, short CurrentUserId);
    }
}
