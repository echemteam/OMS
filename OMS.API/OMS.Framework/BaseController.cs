﻿using Common.Helper.Enum;
using Common.Helper.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OMS.Framework.Model;
using OMS.Shared.Services.Contract;
using System.Net;
using System.Security.Claims;

namespace OMS.Framework
{
    public class BaseController : ControllerBase
    {
        public readonly ICommonSettingService _commonSettingService;
        
        public BaseController(ICommonSettingService commonSettingService)
        {
            _commonSettingService = commonSettingService;
            ModelExtention.AESKey = _commonSettingService.EncryptionSettings.AESKey!;
            ModelExtention.AESIV = _commonSettingService.EncryptionSettings.AESIV!;
            ModelExtention.IsEncrypt = _commonSettingService.EncryptionSettings.IsEnableEncryption!;

        }

        public short CurrentUserId
        {
            get
            {
                var userIdentity = User?.Identity;
                if (userIdentity?.IsAuthenticated == true)
                {
                    var claimValue = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    if (short.TryParse(claimValue, out var userId))
                    {
                        return userId;
                    }
                }
                return 0;
            }
        }
        protected string IPAddress
        {
            get
            {
                try
                {
                    return HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? string.Empty;
                }
                catch
                {
                    return string.Empty;
                }
            }
        }

        [NonAction]
        public IActionResult APISucessResponce<T>(T itemResponce, string message = "", APIResponceCode responseCode = APIResponceCode.OK)
        {
            ApiResponse<T> _responce = new ApiResponse<T>
            {
                Data = itemResponce,
                Message = message,
                StatusCode = responseCode
            };
            return StatusCode((int)HttpStatusCode.OK, _responce);
        }

        [NonAction]
        public IActionResult APIErrorResponce<T>(T exception, APIResponceCode responseCode = APIResponceCode.INTERNAL_SERVER_ERROR)
        {
            ApiResponse<string> _responce = new ApiResponse<string>
            {
                Data = { },
                Message = "Sorry, We get serverside error. Please report us",
                StatusCode = responseCode

            };
            return StatusCode((int)HttpStatusCode.InternalServerError, _responce);
        }

        [NonAction]
        public IActionResult UnAuthorizeAPI()
        {
            ApiResponse<string> _responce = new ApiResponse<string>
            {
                Data = null,
                Message = "User is not authorize",
                StatusCode = APIResponceCode.UnAthorize
            };
            return StatusCode((int)HttpStatusCode.Unauthorized, _responce);
        }
    }
}
