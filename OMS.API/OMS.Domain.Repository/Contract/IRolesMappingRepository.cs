﻿using OMS.Domain.Entities.API.Request.RoleMapping;
using OMS.Domain.Entities.API.Response.RoleMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.RoleMapping;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IRolesMappingRepository
    {
        Task<AddEntityDTO<int>> AddRoleMapping(RoleMappingDTO addUser);
        Task<EntityList<GetRolesMappingByRoleIdResponse>> GetRolesMappingByRoleId(GetRolesMappingByRoleIdRequest requestData);
        Task<AddEntityDTO<int>> DeleteRolesMapping(int userRoleId, int deletedBy);
    }
}