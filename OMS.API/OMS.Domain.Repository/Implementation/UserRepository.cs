using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.User;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class UserRepository : BaseRepository<User>, IUserRepository
    {
        #region SP Name
        const string ADDUSERS = "AddUsers";
        const string UPDATEUSER = "UpdateUser";
        const string GETUSERBYUSERID = "GetUserByUserId";
        const string DELETEUSER = "DeleteUser";
        const string GETUSERS = "GetUsers";
        const string UPDATEUSERPASSWORD = "UpdateUserPassword";
        #endregion

        public UserRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region User Repsitory
        public async Task<AddEntityDto<int>> AddUser(UserDto addUser)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDUSERS, new
            {
                addUser.FirstName,
                addUser.LastName,
                addUser.UserName,
                addUser.PasswordSalt,
                addUser.HashedPassword,
                addUser.IsActive,
                addUser.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> UpdateUser(UserDto updateUser)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATEUSER, new
            {
                updateUser.UserId,
                updateUser.FirstName,
                updateUser.LastName,
                updateUser.UserName,
                updateUser.IsActive,
                updateUser.UpdatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<UserResponse> GetUserByUserId(short userId)
        {
            UserResponse user = await _context.GetFrist<UserResponse>(GETUSERBYUSERID, new
            {
                userId
            }, CommandType.StoredProcedure);
            return user;
        }

        public async Task<AddEntityDto<int>> DeleteUser(short userId, short deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETEUSER, new
            {
                userId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<UserListResponse>> GetUsers(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<UserListResponse>(GETUSERS, new
            {
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString,
            }, true);
        }

        public async Task<AddEntityDto<int>> UpdateUserPassword(UserDto updateUserPassword)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATEUSERPASSWORD, new
            {
                updateUserPassword.UserId,
                updateUserPassword.HashedPassword,
                updateUserPassword.PasswordSalt,
                updateUserPassword.UpdatedBy,

            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
