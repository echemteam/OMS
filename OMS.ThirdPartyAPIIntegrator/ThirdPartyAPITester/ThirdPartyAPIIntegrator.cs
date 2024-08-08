using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Web;
using ThirdPartyAPILibrary.Enums;
using ThirdPartyAPILibrary.Helper;
using ThirdPartyAPILibrary.Model;
using ThirdPartyAPILibrary.Services;
using ThirdPartyAPILibrary.ThirdPartyResponseProvider;

namespace ThirdPartyAPILibrary
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            ThirdPartyAPIIntegrator integrator = new();
            await integrator.Run(args);
        }
    }

    public class ThirdPartyAPIIntegrator
    {
        private static readonly HttpClient HttpClient = new();

        public async Task Run(string[] args)
        {
            Console.WriteLine("Starting API Test...");
            var parameters = new
            {
                pageNo = 1,
                pageSize = 25,
                orderByColumn = "ProductName",
                orderFlag = 0,
                searchText = "acid"
            };

            ThirdPartyAPICallRequest requestData = new()
            {
                EventName = "Product Details",
                IsDynamicParameter = false
            };
            APIResponse testResult = await GetThirdPartyApiResponse(requestData);
            Console.WriteLine($"API Test Result: {testResult}");
        }

        public static async Task<APIResponse> GetThirdPartyApiResponse(ThirdPartyAPICallRequest requestData)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("APIClientAppSettings.json").Build();
            string OMSConnection = configuration["ConnectionStrings:OMS"] ?? "";
            ImportHelper helper = new(new APIClientDapperContext(OMSConnection));

            APIResponse results = new();
            TokenDetails accessTokenObj = new();
            try
            {
                // Get the list of API providers based on apiEventId
                APIEventResponse getApiEvent = await helper.GetAPIEndPointByApiEventId(requestData.EventName);
                string url = getApiEvent.BaseURL;

                if (getApiEvent == null)
                {

                    results.Message = "No API Event provider found.";
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
                }
                if (string.IsNullOrEmpty(getApiEvent.BaseURL))
                {
                    results.Message = $"Invalid API Event BaseURL {getApiEvent.BaseURL}.";
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
                }
                if (getApiEvent.Parameters == null && !requestData.IsDynamicParameter)
                {
                    results.Message = $"Invalid API Event Parameter {getApiEvent.Parameters}.";
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
                }
                if (getApiEvent.AuthenticationType == AuthenticationType.APIKEY)
                {
                    if (getApiEvent.AuthKey != null && getApiEvent.AuthKey != "")
                    {
                        accessTokenObj.IsSuccess = true;
                        accessTokenObj.Token = getApiEvent.AuthKey;
                        accessTokenObj.Message = "Authentication Key successfully provide.";
                    }
                    else
                    {
                        accessTokenObj.IsSuccess = false;
                        results.Message = "Invalid Authentication Key";
                        results.Data = "";
                        results.IsSuccess = false;
                        return results;
                    }

                }
                else if (getApiEvent.AuthenticationType == AuthenticationType.OAUTH)
                {
                    var tokenManagementService = new TokenManagementService();

                    // Configure TokenManagementService with API Event details
                    tokenManagementService.Configure(getApiEvent.ClientId, getApiEvent.ClientSecret, getApiEvent.EndPointName, getApiEvent.Token, getApiEvent.TokenExpiryTime, getApiEvent.TokenExpireDate);
                    accessTokenObj = await tokenManagementService.GetAccessTokenAsync();
                    if (accessTokenObj.IsSuccess == true && accessTokenObj.Token != null && accessTokenObj.Token != "")
                    {
                        await helper.UpdateAPIAuthticationToken(accessTokenObj.Token, accessTokenObj.ExpiryTime, getApiEvent.AuthId);
                    }
                }
                else
                {
                    results.Message = "Invalid Authentication Type";
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
                }
                if (accessTokenObj.IsSuccess == true && accessTokenObj.Token != null && accessTokenObj.Token != "")
                {
                    List<APIRequiredFields> getRequiredField = await helper.GetAPIRequiredFieldsByEventId(getApiEvent.ApiEventId);

                    if (getApiEvent.Method == "GET")
                    {
                        var parameters = JsonConvert.DeserializeObject<Dictionary<string, string>>(requestData.IsDynamicParameter ? requestData.Parameters : getApiEvent.Parameters);

                        var uriBuilder = new UriBuilder(getApiEvent.BaseURL);
                        var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                        foreach (var param in parameters)
                        {
                            query[param.Key] = param.Value;
                        }
                        uriBuilder.Query = query.ToString();

                        url = uriBuilder.ToString();
                        results = await APIResponseProvider.GetMethod(url, accessTokenObj.Token, getRequiredField);
                    }
                    else if (getApiEvent.Method == "POST")
                    {
                        string parameters = requestData.IsDynamicParameter ? requestData.Parameters : getApiEvent.Parameters;
                        results = await APIResponseProvider.PostMethod(url, accessTokenObj.Token, parameters, getRequiredField);
                    }
                    else
                    {
                        results.Message = $"Unsupported HTTP method: {getApiEvent.Method} for apiEventId {getApiEvent.ApiEventId}.";
                        results.Data = "";
                        results.IsSuccess = false;
                        return results;
                    }
                }
                else
                {
                    results.Message = accessTokenObj.Message;
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
                }
            }
            catch (Exception ex)
            {
                results.Message = $"An error occurred: {ex.Message}";
                results.Data = "";
                results.IsSuccess = false;
            }

            return results;
        }
    }
}
