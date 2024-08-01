using Common.Helper.Encryption;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using OMS.Shared.Services.Contract;

namespace OMS.Framework.Middleware
{
    public class DecryptMiddleware
    {

        private readonly RequestDelegate _next;
        private readonly ILogger<DecryptMiddleware> _logger;

        public DecryptMiddleware(RequestDelegate next, ILogger<DecryptMiddleware> logger)
        {
            _next = next;
            _logger = logger;


        }
        public async Task InvokeAsync(HttpContext context, ICommonSettingService _commonSettingService)
        {

            _logger.LogInformation("decrypt Middleware :" + context.Request.Method);
            _logger.LogInformation("decrypt Path :" + context.Request.Path);

            try
            {

                if ((context.Request.Method == "POST" || context.Request.Method == "PUT" || context.Request.Method == "PATCH")
                    && _commonSettingService.EncryptionSettings.IsEnableEncryption &&
                    _commonSettingService.ApplicationSettings.APIsToIgnoreForEncryption != context.Request.Path.Value
                    )
                {
                    // Read the request body
                    var requestBodyStream = new MemoryStream();
                    await context.Request.Body.CopyToAsync(requestBodyStream);
                    requestBodyStream.Seek(0, SeekOrigin.Begin);

                    using (var reader = new StreamReader(requestBodyStream))
                    {
                        // Read the encrypted data from the request body
                        var encryptedData = await reader.ReadToEndAsync();

                        // Decrypt the data
                        var decryptedData = AesEcnryption.AesDecrypt(encryptedData,
                                                                    _commonSettingService.EncryptionSettings.AESKey,
                                                                    _commonSettingService.EncryptionSettings.AESIV, true);
                        // Replace the request body with the decrypted data
                        context.Request.Body = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(decryptedData));
                    }
                }
                else if ((context.Request.Method == "GET" || context.Request.Method == "DELETE")
                   && _commonSettingService.EncryptionSettings.IsEnableEncryption)
                {

                    var route = context.GetRouteData();

                    _logger.LogInformation("Query String :" + context.Request.QueryString);
                    // Decrypt query parameters
                    var encryptedQueryString = context.Request.QueryString.Value.Substring(1);
                    if (!string.IsNullOrEmpty(encryptedQueryString))
                    {
                        var decryptedQueryString = AesEcnryption.AesDecrypt(encryptedQueryString,
                            _commonSettingService.EncryptionSettings.AESKey,
                            _commonSettingService.EncryptionSettings.AESIV, true);

                        _logger.LogInformation("decrypted Query String :" + decryptedQueryString);
                        // Replace the query string with the decrypted query string
                        context.Request.QueryString = new QueryString("?" + decryptedQueryString);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("decrypt Middleware :" + ex.Message);
            }
            await _next(context);
        }
    }
}
