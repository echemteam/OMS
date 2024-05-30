using Common.Helper.Extension;
using Common.Helper.Utility;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.User;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.User;
using OMS.Domain.Repository;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.User
{
    public class UserService : BaseServices, IUserService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public UserService(IRepositoryManager _repoManager, ICommonSettingService _commonSettingServices) : base(_repoManager, _commonSettingServices)
        {

        }
        #endregion

        #region User Service 
        public async Task<AddEntityDTO<int>> AddUser(AddUserRequest requestData, short CurrentUserId)
        {
            UserDTO user = requestData.ToMapp<AddUserRequest, UserDTO>();
            user.CreatedBy = CurrentUserId;
            user.PasswordSalt = EncryptionUtil.GenerateSalt(8);
            user.HashedPassword = EncryptionUtil.GenerateHashKeyUsingSalt(user.Password!.Trim(), user.PasswordSalt);
            return await repositoryManager.user.AddUser(user);
        }
        public async Task<AddEntityDTO<int>> UpdateUser(UpdateUserRequest requestData, short CurrentUserId)
        {
            UserDTO user = requestData.ToMapp<UpdateUserRequest, UserDTO>();
            user.UpdatedBy = CurrentUserId;
            return await repositoryManager.user.UpdateUser(user);
        }
        public async Task<UserResponse> GetUserByUserId(short userId)
        {
            return await repositoryManager.user.GetUserByUserId(userId);
        }

        public async Task<AddEntityDTO<int>> DeleteUser(short userId, short deletedBy)
        {
            return await repositoryManager.user.DeleteUser(userId, deletedBy);
        }

        public async Task<EntityList<UserListResponse>> GetUsers(ListEntityRequest<BaseFilter> requestData)
        {
            return await repositoryManager.user.GetUsers(requestData);
        }

        public async Task<AddEntityDTO<int>> UpdateUserPassword(UpdateUserPasswordRequest updateUserPassword, short CurrentUserId)
        {
            UserDTO userDTO = updateUserPassword.ToMapp<UpdateUserPasswordRequest, UserDTO>();
            userDTO.UpdatedBy = CurrentUserId;
            userDTO.PasswordSalt = EncryptionUtil.GenerateSalt(8);
            userDTO.HashedPassword = EncryptionUtil.GenerateHashKeyUsingSalt(userDTO.Password!.Trim(), userDTO.PasswordSalt);
            return await repositoryManager.user.UpdateUserPassword(userDTO);
        }
        #endregion
    }
}
