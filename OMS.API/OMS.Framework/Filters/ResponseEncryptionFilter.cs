using Common.Helper.Encryption;
using Common.Helper.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using OMS.Framework.Model;
using OMS.Shared.Services.Contract;

namespace OMS.Framework.Filters
{
    public class ResponseEncryptionFilter : IActionFilter
    {
        public readonly ICommonSettingService _commonSettingService;
        public ResponseEncryptionFilter(ICommonSettingService commonSettingService)
        {
            _commonSettingService = commonSettingService;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            ResponseWrapper<object> response = new();
            var isEncryptionEnable = _commonSettingService.EncryptionSettings.IsEnableEncryption;
            response.IsEnType = false;
            response.ResponseType = ResponseType.String;
            response.ResponseData = string.Empty;

            if (context.Result == null)
            {
                context.Result = new ObjectResult(response);
            }
            else if (
                (typeof(ObjectResult) == context.Result.GetType() ||
                typeof(BadRequestObjectResult) == context.Result.GetType()
                ) && context.Result != null)
            {
                var data = GetContextResult(context);
                response.IsEnType = isEncryptionEnable;
                response.ResponseType = ResponseType.Object;
                if (isEncryptionEnable)
                {
                    data = AesEcnryption.AesEncrypt(data, _commonSettingService.EncryptionSettings.AESKey, _commonSettingService.EncryptionSettings.AESIV);
                }
                response.ResponseData = data;
                GetResponseResutl(context, response);

            }
        }

        private ActionExecutedContext GetResponseResutl(ActionExecutedContext context, ResponseWrapper<object> response)
        {
            string data = string.Empty;
            if (typeof(ObjectResult) == context.Result.GetType())
            {
                context.Result = new ObjectResult(response);
            }
            if (typeof(BadRequestObjectResult) == context.Result.GetType())
            {
                context.Result = new BadRequestObjectResult(response);
            }
            return context;
        }

        private string GetContextResult(ActionExecutedContext context)
        {
            string data = string.Empty;
            if (typeof(ObjectResult) == context.Result.GetType())
            {
                var result = (ObjectResult)context.Result;
                data = JsonUtility.ObjectToJson(result.Value, Formatting.Indented, true);
            }
            if (typeof(BadRequestObjectResult) == context.Result.GetType())
            {
                var result = (BadRequestObjectResult)context.Result;
                data = JsonUtility.ObjectToJson(result.Value, Formatting.Indented, true);
            }
            return data;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {

        }
    }
}
