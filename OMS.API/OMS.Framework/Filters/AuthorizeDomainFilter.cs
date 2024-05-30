using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OMS.Shared.Services.Contract;

namespace OMS.Framework.Filters
{
    public class AuthorizeDomainFilter : IActionFilter
    {
        public readonly ICommonSettingService _commonSettingService;
        public AuthorizeDomainFilter(ICommonSettingService commonSettingService)
        {
            _commonSettingService = commonSettingService;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!IsUserAuthorized(context.HttpContext.Request) && _commonSettingService.AuthorizeDomainSetting.IsEnable)
            {
                context.Result = new UnauthorizedResult();
            }
        }

        private bool IsUserAuthorized(HttpRequest request)
        {
            string referrerUrl = request.Headers["Referer"].ToString();
            if (_commonSettingService.AuthorizeDomainSetting.AuthorizeUri == null)
            {
                return true;
            }
            var authroizeUrli = _commonSettingService.AuthorizeDomainSetting.AuthorizeUri.Split(',');
            return authroizeUrli.Length > 0 && authroizeUrli.Any(uri => referrerUrl.Contains(uri, StringComparison.OrdinalIgnoreCase));
        }
    }
}
