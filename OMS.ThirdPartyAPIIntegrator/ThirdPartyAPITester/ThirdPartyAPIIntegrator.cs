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
    //public class Program
    //{
    //    public static async Task Main(string[] args)
    //    {
    //        ThirdPartyAPIIntegrator integrator = new();
    //        await integrator.Run(args);
    //    }
    //}

    public class ThirdPartyAPIIntegrator
    {
        private static readonly HttpClient HttpClient = new();

        //public async Task Run(string[] args)
        //{
        //    Console.WriteLine("Starting API Test...");
        //    var parameters = new
        //    {
        //        pageNo = 1,
        //        pageSize = 25,
        //        orderByColumn = "ProductName",
        //        orderFlag = 0,
        //        searchText = "acid"
        //    };

        //    ThirdPartyAPICallRequest requestData = new()
        //    {
        //        EventName = "1Click Product Price List",
        //        IsDynamicParameter = false
        //    };
        //    APIResponse testResult = await GetThirdPartyApiResponse(requestData);
        //    Console.WriteLine($"API Test Result: {testResult}");
        //}

        public static async Task<APIResponse> GetThirdPartyApiResponse(ThirdPartyAPICallRequest requestData)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("APIClientAppSettings.json").Build();
            string OMSConnection = configuration["ConnectionStrings:OMS"] ?? "";
            ImportHelper helper = new(new APIClientDapperContext(OMSConnection));

            APIResponse results = new();
            TokenDetails accessTokenObj = new();
            string requestUrl = string.Empty;
            int apiEventId = 0;
            try
            {
                // Get the list of API providers based on apiEventId
                APIEventResponse getApiEvent = await helper.GetAPIEndPointByApiEventId(requestData.EventName);
                string url = getApiEvent.BaseURL;
                requestUrl = url!;
                apiEventId = getApiEvent.ApiEventId;
                await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 200, errorMessage: "Successfully retrieved API endpoint information.", logType: "Request", requestUrl);

                if (getApiEvent == null)
                {
                    results.Message = "No API Event provider found.";
                    results.Data = "";
                    results.IsSuccess = false;
                    await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 404, errorMessage: "API Event provider not found.", logType: "Request", requestUrl);
                    return results;
                }
                if (string.IsNullOrEmpty(getApiEvent.BaseURL))
                {
                    results.Message = $"Invalid API Event BaseURL {getApiEvent.BaseURL}.";
                    results.Data = "";
                    results.IsSuccess = false;
                    await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 400, errorMessage: $"API Event BaseURL is missing or invalid: {getApiEvent.BaseURL}.", logType: "Request", requestUrl);
                    return results;
                }
                if (getApiEvent.Parameters == null && !requestData.IsDynamicParameter)
                {
                    results.Message = $"Invalid API Event Parameter {getApiEvent.Parameters}.";
                    results.Data = "";
                    results.IsSuccess = false;
                    await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 400, errorMessage: "API Event parameters are missing or invalid.", logType: "Request", requestUrl);
                    return results;
                }
                if (getApiEvent.AuthenticationType == AuthenticationType.APIKEY)
                {
                    if (getApiEvent.AuthKey != null && getApiEvent.AuthKey != "")
                    {
                        accessTokenObj.IsSuccess = true;
                        accessTokenObj.Token = getApiEvent.AuthKey;
                        accessTokenObj.Message = "Authentication Key successfully provide.";
                        await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 200, errorMessage: "API Key authentication successful.", logType: "Request", requestUrl);
                    }
                    else
                    {
                        accessTokenObj.IsSuccess = false;
                        results.Message = "Invalid Authentication Key";
                        results.Data = "";
                        results.IsSuccess = false;
                        await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 401, errorMessage: "Invalid API Key authentication key.", logType: "Request", requestUrl);
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
                        await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 200, errorMessage: "OAuth authentication successful.", logType: "Request", requestUrl);
                    }
                    else
                    {
                        await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 200, errorMessage: "Invalid OAuth authentication.", logType: "Request", requestUrl);
                    }
                }
                else
                {
                    results.Message = "Invalid Authentication Type";
                    results.Data = "";
                    results.IsSuccess = false;
                    await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 400, errorMessage: $"Unsupported authentication type: {getApiEvent.AuthenticationType}.", logType: "Request", requestUrl);
                    return results;
                }
                if (accessTokenObj.IsSuccess == true && accessTokenObj.Token != null && accessTokenObj.Token != "")
                {
                    List<APIRequiredFields> getRequiredField = await helper.GetAPIRequiredFieldsByEventId(getApiEvent.ApiEventId);

                    if (getRequiredField.Count == 0)
                    {
                        results.Message = "Required fields Or mapping are missing. Please ensure all necessary fields are provided before proceeding.";
                        results.Data = "";
                        results.IsSuccess = false;
                        await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 400, errorMessage: "Missing required fields or mappings.", logType: "Request", requestUrl);
                        return results;
                    }
                    else
                    {
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
                            await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: results.IsSuccess ? 200 : 400, errorMessage: results.IsSuccess ? "API return response successful." : $"GET request failed: {results.Message}", logType: "Response", requestUrl);

                        }
                        else if (getApiEvent.Method == "POST")
                        {
                            string parameters = requestData.IsDynamicParameter ? requestData.Parameters : getApiEvent.Parameters;
                            results = await APIResponseProvider.PostMethod(url, accessTokenObj.Token, parameters, getRequiredField);
                            await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: results.IsSuccess ? 200 : 400, errorMessage: results.IsSuccess ? "API return response successful." : $"POST request failed: {results.Message}", logType: "Response", requestUrl);

                        }
                        else
                        {
                            results.Message = $"Unsupported HTTP method: {getApiEvent.Method} for apiEventId {getApiEvent.ApiEventId}.";
                            results.Data = "";
                            results.IsSuccess = false;
                            await helper.AddApiEventLog(eventId: getApiEvent?.ApiEventId ?? 0, requestData: JsonConvert.SerializeObject(requestData), statusCode: 400, errorMessage: $"Unsupported HTTP method: {getApiEvent.Method}.", logType: "Request", requestUrl);
                            return results;
                        }
                    }
                }
                else
                {
                    results.Message = accessTokenObj.Message;
                    results.Data = "";
                    results.IsSuccess = false;
                    await helper.AddApiEventLog(eventId: apiEventId, requestData: JsonConvert.SerializeObject(requestData), statusCode: 401, errorMessage: $"Access token error: {accessTokenObj.Message}.", logType: "Request", requestUrl);
                    return results;
                }
            }
            catch (Exception ex)
            {
                results.Message = $"An error occurred: {ex.Message}";
                results.Data = "";
                results.IsSuccess = false;
                await helper.AddApiEventLog(eventId: apiEventId, requestData: JsonConvert.SerializeObject(requestData), statusCode: 500, errorMessage: $"Exception: {ex.Message}.", logType: "Error", requestUrl);
            }

            return results;
        }
    }
}
