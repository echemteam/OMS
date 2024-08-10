using Common.Helper.Extension;
using Common.Helper.Utility;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.User;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.User;
using OMS.Domain.Repository;
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
        public async Task<AddEntityDto<int>> AddUser(AddUserRequest requestData, short CurrentUserId)
        {
            UserDto user = requestData.ToMapp<AddUserRequest, UserDto>();
            user.CreatedBy = CurrentUserId;
            user.PasswordSalt = EncryptionUtil.GenerateSalt(8);
            user.HashedPassword = EncryptionUtil.GenerateHashKeyUsingSalt(user.Password!.Trim(), user.PasswordSalt);
            return await repositoryManager.user.AddUser(user);
        }
        public async Task<AddEntityDto<int>> UpdateUser(UpdateUserRequest requestData, short CurrentUserId)
        {
            UserDto user = requestData.ToMapp<UpdateUserRequest, UserDto>();
            user.UpdatedBy = CurrentUserId;
            return await repositoryManager.user.UpdateUser(user);
        }
        public async Task<UserResponse> GetUserByUserId(short userId)
        {
            return await repositoryManager.user.GetUserByUserId(userId);
        }

        public async Task<AddEntityDto<int>> DeleteUser(short userId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.user.DeleteUser(userId, deletedBy);
        }

        public async Task<EntityList<UserListResponse>> GetUsers(ListEntityRequest<BaseFilter> requestData)
        {
            return await repositoryManager.user.GetUsers(requestData);
        }

        public async Task<AddEntityDto<int>> UpdateUserPassword(UpdateUserPasswordRequest updateUserPassword, short CurrentUserId)
        {
            UserDto userDto = updateUserPassword.ToMapp<UpdateUserPasswordRequest, UserDto>();
            userDto.UpdatedBy = CurrentUserId;
            userDto.PasswordSalt = EncryptionUtil.GenerateSalt(8);
            userDto.HashedPassword = EncryptionUtil.GenerateHashKeyUsingSalt(userDto.Password!.Trim(), userDto.PasswordSalt);
            return await repositoryManager.user.UpdateUserPassword(userDto);
        }
        #endregion
    }
}
