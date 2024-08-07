using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using OMS.Application.Services;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Services.Contract;
using System.Net;

namespace OMS.Framework.Middleware
{
    public class CustomErrorMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<CustomErrorMiddleware> _logger;

        public CustomErrorMiddleware(RequestDelegate next, ILogger<CustomErrorMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, IServiceManager _serviceManager, IEmailService _email)
        {

            try
            {
                _logger.LogInformation("custom error Middleware :" + context.Request.Method + " ---> " + "custom error  :" + context.Request.Path);
                await _next(context);
            }
            catch (Exception exception)
            {
                ErrorResponse _errorResponce = new()
                {
                    MethodName = context.Request.Path.Value,
                    ErrorMessage = exception.Message,
                    StackTrace = exception.StackTrace
                };
                if (exception.InnerException != null)
                {
                    _errorResponce.InnerExceptionMessage = exception.InnerException.Message;
                    _errorResponce.InnerExceptionStackTrace = exception.InnerException.StackTrace;
                }

                ExceptionLogDto errorLog = new()
                {
                    ModuleName = context.Request.Path.Value,
                    SystemErrorMessage = exception.Message,
                    TrackTrace = exception.StackTrace
                };
                if (exception.InnerException != null)
                {
                    errorLog.InnerSystemErrorMessage = exception.InnerException.Message;
                    errorLog.InnerTrackTrace = exception.InnerException.Message;
                }
                errorLog.LogType = "Error";

                errorLog.CreatedDate = DateTime.Now;

                _email.SendErrorEmail(errorLog);

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }
        }
    }
}
