using Common.Helper.Extension;
using Common.Helper.Utility;
using Microsoft.IdentityModel.Tokens;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Authentication;
using OMS.Domain.Entities.API.Response.Authentication;
using OMS.Domain.Entities.API.Response.SecuritySetting;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Roles;
using OMS.Domain.Entities.Entity.User;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OMS.Application.Services.Authentication
{
    public class AuthenticationService : BaseServices, IAuthenticationService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public AuthenticationService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region User Login Service
        public async Task<AuthenticationResponse> UserLogin(AuthenticationRequest authenticationRequest)
        {
            AuthenticationResponse authResponce = new()
            {
                IsAuthenticated = true
            };
            UserDto user = await repositoryManager.authentication.UserLogin(authenticationRequest.UserName);
            if (user == null || !user.IsActive)
            {
                authResponce.Message = (user == null ? "User details not found" : "User is not active");
                authResponce.IsAuthenticated = false;
                return authResponce;
            }
            string enCriptedPassword = EncryptionUtil.GenerateHashKeyUsingSalt(authenticationRequest.Password!.Trim(), user.PasswordSalt!);
            if (user!.HashedPassword != enCriptedPassword)
            {
                authResponce.IsAuthenticated = false;
                authResponce.Message = "Invalid credentials !!";
                return authResponce;
            }
            BaseRolesDto role = await repositoryManager.authentication.GetUserRoles(user.UserId);
            List<GetSecurityPermissionByUserIdResponse> response = await repositoryManager.securityPermission.GetSecurityPermissionByUserId(user.UserId);
            authResponce.securityPermissions = response.Select(a => new SecurityPermissionsDetails()
            {
                SecurityKeyName = a.SecurityKeyName,
                IsMenu = a.IsMenu,
                SecurityKeyParentId = a.SecurityKeyParentId,
                SecuritySettingId = a.SecuritySettingId
            }).ToList();

            UserDetails userDetails = user.ToMapp<UserDto, UserDetails>();
            authResponce.User = userDetails;
            authResponce.Roles = role;
            authResponce.SessionTimeout = Convert.ToInt32((commonSettingService.ApplicationSettings.SessionTimeOut != null) ? Convert.ToInt32(commonSettingService.ApplicationSettings.SessionTimeOut) : 60);
            authResponce.Token = GenerateToken(user.UserId, Convert.ToDouble((commonSettingService.ApplicationSettings.SessionTimeOut != null) ? Convert.ToInt32(commonSettingService.ApplicationSettings.SessionTimeOut) : 60));
            authResponce.Message = "User successfully authenticated";
            return authResponce;
        }
        #endregion

        #region Generate Tokan 
        private TokenDetails GenerateToken(short? userId, double expiryHours)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(commonSettingService.JwtTokenSettings.Secret!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = commonSettingService.JwtTokenSettings.Issuer,
                Subject = new ClaimsIdentity(new Claim[]
                  {
                          new Claim(ClaimTypes.NameIdentifier, userId.ToString())
                  }),
                Expires = DateTime.UtcNow.AddHours(expiryHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

            };

            TokenDetails tokenObj = new TokenDetails();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            tokenObj.Token = tokenHandler.WriteToken(token);
            tokenObj.Expires = tokenDescriptor.Expires;
            return tokenObj;
        }
        #endregion
    }
}
