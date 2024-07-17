using OMS.Domain.Entities.API.Response.Roles;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Roles;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class RolesRepository : BaseRepository<Roles>, IRolesRepository
    {
        #region StoredProcedures
        const string ADDROLES = "AddRoles";
        const string UPDATEROLES = "UpdateRoles";
        const string DELETEROLES = "DeleteRoles";
        const string GETROLES = "GetRoles";
        const string GETROLEBYROLEID = "GetRoleByRoleId";

        #endregion
        public RolesRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Roles Repository
        public async Task<AddEntityDTO<int>> AddRoles(RolesDTO roles)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDROLES, new
            {
                roles.RoleName,
                roles.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateRoles(RolesDTO updateRoles)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATEROLES, new
            {
                updateRoles.RoleId,
                updateRoles.RoleName,
                updateRoles.UpdatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> DeleteRoles(int roleId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEROLES, new
            {
                roleId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetRolesListResponse>> GetRoles(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<GetRolesListResponse>(GETROLES, new
            {
                requestData.Pagination!.PageNumber,
                requestData.Pagination.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }

        public async Task<GetRolesResponse> GetRoleByRoleId(int roleId)
        {
            GetRolesResponse rolesdetils = await _context.GetFrist<GetRolesResponse>(GETROLEBYROLEID, new
            {
                roleId
            }, CommandType.StoredProcedure);
            return rolesdetils;
        }
        #endregion
    }
}
