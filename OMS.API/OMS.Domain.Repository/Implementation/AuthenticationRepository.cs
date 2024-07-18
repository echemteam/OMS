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
        #endregion

        #region Constructor
        public AuthenticationRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        #endregion

        #region User Login Repository
        public async Task<UserDTO> UserLogin(string? userName)
        {
            UserDTO userDTO = await _context.GetFrist<UserDTO>(GETUSERBYUSERNAME, new
            {
                userName
            }, CommandType.StoredProcedure);
            return userDTO;
        }
        public async Task<BaseRolesDTO> GetUserRoles(short? userId)
        {
            BaseRolesDTO userDTO = await _context.GetFrist<BaseRolesDTO>(GETUSERROLES, new
            {
                userId
            }, CommandType.StoredProcedure);
            return userDTO;
        }
        #endregion
    }
}
