using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Collections.Generic;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class CommonRepository : BaseRepository<CommonEntity>, ICommonRepository
    {
        #region SP Name 
        const string GETALLROLES = "GetAllRoles";
        const string GETUNASSIGNEDUSERBYROLEID = "GetUnAssignedUserByRoleId";
        #endregion

        public CommonRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<List<GetAllRolesResponse>> GetAllRoles()
        {
            return await _context.GetList<GetAllRolesResponse>(GETALLROLES, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetUnAssignedUserByRoleIdResponse>> GetUnAssignedUserByRoleId(byte roleId)
        {
            List<GetUnAssignedUserByRoleIdResponse> getAllUsersResponse =await _context.GetList<GetUnAssignedUserByRoleIdResponse>(GETUNASSIGNEDUSERBYROLEID, new
            {
                roleId
            }, commandType: CommandType.StoredProcedure);
            return getAllUsersResponse;
        }

    }
}
