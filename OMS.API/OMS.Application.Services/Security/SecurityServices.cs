using Common.Helper.Export;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Security;
using OMS.Domain.Entities.API.Response.Security;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System.Data;

namespace OMS.Application.Services.Security
{
    public class SecurityServices : BaseServices, ISecurityServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public SecurityServices(IRepositoryManager _repoManager, ICommonSettingService _commonSettingServices) : base(_repoManager, _commonSettingServices)
        {

        }
        #endregion

        public async Task<List<GetAllPagesByRoleIdResponse>> GetAllPagesByRoleId(int id)
        {
            return await repositoryManager.securityPermission.GetAllPagesByRoleId(id);
        }

        public async Task<bool> AddSecurityPermissions(AddSecurityPermissionsRequestList request, short CurrentUserId)
        {
            List<SecurityPermissionsTypeList> dt = request.SecurityPermissionsList!;
            DataTable tbl = ExportHelper.ListToDataTable(dt);
            return await repositoryManager.securityPermission.AddSecurityPermissions(tbl, CurrentUserId);
        }
    }
}
