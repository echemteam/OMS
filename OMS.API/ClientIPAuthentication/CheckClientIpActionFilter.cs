using ClientIPAuthentication.Enum;
using ClientIPAuthentication.Helper;
using ClientIPAuthentication.Helper.DB_Helper;
using ClientIPAuthentication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;

namespace ClientIPAuthentication
{
    public class CheckClientIpActionFilter : ActionFilterAttribute
    {
        private static readonly MemoryCache _memoryCache = new MemoryCache(new MemoryCacheOptions());

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            try
            {
                var configuration = new ConfigurationBuilder().AddJsonFile("ClientIPAppSetting.json").Build();
                string connectionString = configuration["CentralizeSystem:connectionString"] ?? "";

                var remoteIPAddress = context.HttpContext.Connection.RemoteIpAddress?.ToString();
                bool checkWhiteListIP = Convert.ToBoolean(configuration["CheckWhiteListIP"]);

                var cacheKey = $"whitelist_ip_{remoteIPAddress}";

                if (!_memoryCache.TryGetValue(cacheKey, out bool isWhitelisted))
                {
                    GetIPAddressHelper getIpAddress = new(new ConnectionDapperContext(connectionString));
                    var getWhiteListIPAddress = await getIpAddress.GetWhiteListIPAddress(remoteIPAddress!);

                    isWhitelisted = getWhiteListIPAddress.Id;
                    _memoryCache.Set(cacheKey, isWhitelisted, new MemoryCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                    });
                }
                else
                {
                    isWhitelisted = true;
                }

                if (checkWhiteListIP && !isWhitelisted)
                {

                    if (!isWhitelisted)
                    {
                        var response = new ResponseWrapper<object>
                        {
                            ResponseType = ResponseType.Object,
                            ResponseData = "Unauthorized",
                            IsEnType = false
                        };
                        context.Result = new JsonResult(response) { StatusCode = StatusCodes.Status401Unauthorized };
                        return;
                    }
                }
                await next();
            }
            catch (Exception ex)
            {
                var response = new ResponseWrapper<object>
                {
                    ResponseType = ResponseType.Object,
                    ResponseData = $"Internal server error: {ex.Message}",
                    IsEnType = false
                };
                context.Result = new JsonResult(response) { StatusCode = StatusCodes.Status500InternalServerError };
                return;
            }
        }
    }
    #region OLD PRIJECT RESPONSE USED.
    //public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    //{
    //    var configuration = new ConfigurationBuilder().AddJsonFile("ClientIPAppSetting.json").Build();
    //    string connectionString = configuration["CentralizeSystem:connectionString"] ?? "";

    //    var remoteIPAddress = context.HttpContext.Connection.RemoteIpAddress?.ToString();
    //    bool checkWhiteListIP = Convert.ToBoolean(configuration["CheckWhiteListIP"]);

    //    if (checkWhiteListIP && !string.IsNullOrEmpty(remoteIPAddress))
    //    {
    //        var getIp = new GetIPAddressHelper(new ConnectionDapperContext(connectionString));
    //        var getWhiteListIPAddress = await getIp.GetWhiteListIPAddress(remoteIPAddress);

    //        //bool badIp = getWhiteListIPAddress.Id;
    //        bool badIp = false;// Assuming Id being null or zero indicates a bad IP

    //        if (!badIp)
    //        {
    //            var response = new
    //            {
    //                IsEnType = false,
    //                ResponseType = ResponseType.Object,
    //                ResponseData = new { message = "Unauthorized" }
    //            };

    //            context.Result = new JsonResult(response) { StatusCode = StatusCodes.Status403Forbidden };
    //        }
    //        else
    //        {
    //            await next(); // Continue to the action method if IP is valid
    //        }
    //    }
    //    else
    //    {
    //        await next(); // Continue to the action method if IP check is disabled or not applicable
    //    }
    //}
    #endregion
}
