using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Roles;
using OMS.Domain.Entities.Entity.User;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class AuthenticationRepository : BaseRepository<User>, IAuthenticationRepository
    {
        #region SP
        const string GETUSERBYUSERNAME = "GetUserByUserName";
        const string GETUSERROLES = "GetUserRoles";
        const string ADDUSERLOGINLOGOUTHISTORY = "AddUserLoginLogoutHistory";
        #endregion

        #region Constructor
        public AuthenticationRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        #endregion

        #region User Login Repository
        public async Task<UserDto> UserLogin(string? userName)
        {
            UserDto userDto = await _context.GetFrist<UserDto>(GETUSERBYUSERNAME, new
            {
                userName
            }, CommandType.StoredProcedure);
            return userDto;
        }
        public async Task<BaseRolesDto> GetUserRoles(short? userId)
        {
            BaseRolesDto userDto = await _context.GetFrist<BaseRolesDto>(GETUSERROLES, new
            {
                userId
            }, CommandType.StoredProcedure);
            return userDto;
        }
        public async Task<AddEntityDto<int>> AddUserLoginLogoutHistory(UserHistoryDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDUSERLOGINLOGOUTHISTORY, new
            {
                requestData.UserId,
                requestData.IsLogin,
                requestData.IPAddress,
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
