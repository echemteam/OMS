﻿using OMS.Domain.Entities.API.Request.RoleMapping;
using OMS.Domain.Entities.API.Response.RoleMapping;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.RolesMapping
{
    public interface IRolesMappingServices
    {
        Task<AddEntityDto<int>> AddRoleMapping(AddRoleMappingRequest requestData, short CurrentUserId);
        Task<EntityList<GetRolesMappingByRoleIdResponse>> GetRolesMappingByRoleId(GetRolesMappingByRoleIdRequest requestData);
        Task<AddEntityDto<int>> DeleteRolesMapping(int userRoleId, int deletedBy);
    }
}
