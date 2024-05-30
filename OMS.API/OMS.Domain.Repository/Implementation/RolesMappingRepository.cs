using OMS.Domain.Entities.API.Request.RoleMapping;
using OMS.Domain.Entities.API.Response.RoleMapping;
using OMS.Domain.Entities.API.Response.Roles;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.RoleMapping;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class RolesMappingRepository : BaseRepository<UserRoles>, IRolesMappingRepository
    {
        #region SP Name
        const string ADDROLEMAPPING = "AddRoleMapping";
        const string GETROLESMAPPINGBYROLEID = "GetRolesMappingByRoleId";
        const string DELETEROLESMAPPING = "DeleteRolesMapping";
        #endregion

        public RolesMappingRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Roles Mapping Repsitory
        public async Task<AddEntityDTO<int>> AddRoleMapping(RoleMappingDTO addRoleMapping)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDROLEMAPPING, new
            {
                addRoleMapping.UserId,
                addRoleMapping.RoleId,
                addRoleMapping.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetRolesMappingByRoleIdResponse>> GetRolesMappingByRoleId(GetRolesMappingByRoleIdRequest requestData)
        {
            return await _context.GetListSP<GetRolesMappingByRoleIdResponse>(GETROLESMAPPINGBYROLEID, new
            {
                requestData.RoleId,
                requestData.Pagination!.PageNumber,
                requestData.Pagination.PageSize,
                requestData.Filters?.SearchText
            }, true);
        }

        public async Task<AddEntityDTO<int>> DeleteRolesMapping(int userRoleId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEROLESMAPPING, new
            {
                userRoleId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        #endregion
    }
}
