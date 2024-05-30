using Dapper;
using OMS.Domain.Entities.API.Response.Security;
using OMS.Domain.Entities.API.Response.SecuritySetting;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SecurityPermissionRepository : BaseRepository<SecurityPermissions>, ISecurityPermissionRepository
    {
        #region SP Name 
        const string GETSECURITYPERMISSIONBYUSERID = "GetSecurityPermissionByUserId";
        const string GETALLPAGESBYROLEID = "GetAllPagesByRoleId";
        const string ADDSECURITYPERMISSIONS = "AddSecurityPermissions";

        #endregion

        public SecurityPermissionRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Security Permission Repository
        public async Task<List<GetSecurityPermissionByUserIdResponse>> GetSecurityPermissionByUserId(short? userId)
        {
            List<GetSecurityPermissionByUserIdResponse> response =
            await _context.GetList<GetSecurityPermissionByUserIdResponse>(GETSECURITYPERMISSIONBYUSERID, new
            {
                userId
            }, CommandType.StoredProcedure);
            return response;
        }

        public async Task<List<GetAllPagesByRoleIdResponse>> GetAllPagesByRoleId(int roleId)
        {
            List<GetAllPagesByRoleIdResponse> details = await _context.GetList<GetAllPagesByRoleIdResponse>(GETALLPAGESBYROLEID, new
            {
                roleId
            }, CommandType.StoredProcedure);
            return details;
        }

        public async Task<bool> AddSecurityPermissions(DataTable tbl, short? currentUserId)
        {
            var parameters = new
            {
                SecurityPermissions = tbl.AsTableValuedParameter("[dbo].[SecurityPermissionsType]"),
                UserId = currentUserId
            };
            bool result = await _context.GetScaler<bool>(ADDSECURITYPERMISSIONS,
                parameters,
                commandType: CommandType.StoredProcedure
            );
            return result;
        }

        #endregion
    }
}
