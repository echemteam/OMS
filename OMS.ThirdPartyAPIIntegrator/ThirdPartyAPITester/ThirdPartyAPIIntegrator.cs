using ThirdPartyAPIClientLibrary.Enums;
using ThirdPartyAPIClientLibrary.Helper;
using ThirdPartyAPIClientLibrary.Model;
using ThirdPartyAPIClientLibrary.Services;
using ThirdPartyAPIClientLibrary.ThirdPartyResponseProvider;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Web;

namespace ThirdPartyAPIClientLibrary
{
    //class Program
    //{
    //    static async Task Main(string[] args)
    //    {
    //        // Set up configuration
    //        var configuration = new ConfigurationBuilder()
    //            .AddJsonFile("APITesterAppSettings.json") // or other configuration sources
    //            .Build();

    //        // Instantiate necessary services
    //        var tokenManagementService = new TokenManagementService(); // Replace with actual instantiation

    //        // Instantiate the APITester and call the instance method
    //        var apiTester = new ThirdPartyAPIIntegrator(tokenManagementService, configuration);
    //        await apiTester.Run(args);
    //    }
    //}

    public class ThirdPartyAPIIntegrator
    {
        private readonly TokenManagementService _tokenManagementService;
        private readonly IConfiguration _configuration;
        private static readonly HttpClient HttpClient = new();

        public ThirdPartyAPIIntegrator(TokenManagementService tokenManagementService, IConfiguration configuration)
        {
            _tokenManagementService = tokenManagementService;
            _configuration = configuration;
        }

        //public async Task Run(string[] args)
        //{
        //    Console.WriteLine("Starting API Test...");
        //    int apiEventId = 14; // Example providerId
        //    string testResult = await ThirdPartyAPITest(apiEventId);
        //    Console.WriteLine($"API Test Result: {testResult}");
        //}

        private async Task<string> GetThirdPartyApiResponse(int apiEventId)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("APITesterAppSettings.json").Build();
            string OMSConnection = configuration["ConnectionStrings:OMS"] ?? "";

            ImportHelper helper = new(new APIClientDapperContext(OMSConnection));

            // Get the list of API providers based on apiEventId
            APIEventResponse getApiEvent = await helper.GetAPIEndPointByApiEventId(apiEventId);

            string results = "";
            if (getApiEvent == null)
            {
                return results = "No API Event provider found.";
            }
            if (string.IsNullOrEmpty(getApiEvent.BaseURL))
            {
                return results = $"Invalid API Event BaseURL {getApiEvent.BaseURL}.";
            }
            if (getApiEvent.Parameters == null)
            {
                return results = $"Invalid API Event Parameter {getApiEvent.Parameters}.";
            }

            string response;
            string url = getApiEvent.BaseURL;
            TokenDetails accessTokenObj = new();

            if (getApiEvent.AuthenticationType == AuthenticationType.APIKEY)
            {
                if (getApiEvent.AuthKey != null || getApiEvent.AuthKey != "")
                {
                    accessTokenObj.IsSuccess = true;
                    accessTokenObj.Token = getApiEvent.AuthKey;
                    accessTokenObj.Message = "Authentication Key successfully provide.";
                }
                else
                {
                    accessTokenObj.IsSuccess = false;
                    return results = "Invalid Authentication Key";
                }
                
            }
            else if (getApiEvent.AuthenticationType == AuthenticationType.OAUTH)
            {
                // Configure TokenManagementService with API Event details
                _tokenManagementService.Configure(getApiEvent.ClientId, getApiEvent.ClientSecret, getApiEvent.EndPointName, getApiEvent.Token, getApiEvent.TokenExpiryTime, getApiEvent.TokenExpireDate);
                accessTokenObj = await _tokenManagementService.GetAccessTokenAsync();
                if (accessTokenObj.IsSuccess == true && accessTokenObj.Token != null && accessTokenObj.Token != "")
                {
                    await helper.UpdateAPIAuthticationToken(accessTokenObj.Token, accessTokenObj.ExpiryTime, getApiEvent.AuthId);
                }
            }
            else
            {
                return results = "Invalid Authentication Type";
            }
            //TokenDetails tokenObj = GenerateToken(getApiEvent.TokenExpireDate, clientId, clientSecret, configuration);

            if (accessTokenObj.IsSuccess == true && accessTokenObj.Token != null && accessTokenObj.Token != "")
            {
                List<APIRequiredFields> getRequiredField = await helper.GetAPIRequiredFieldsByEventId(apiEventId);

                if (getApiEvent.Method == "GET")
                {
                    var parameters = JsonConvert.DeserializeObject<Dictionary<string, string>>(getApiEvent.Parameters);

                    var uriBuilder = new UriBuilder(getApiEvent.BaseURL);
                    var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                    foreach (var param in parameters)
                    {
                        query[param.Key] = param.Value;
                    }
                    uriBuilder.Query = query.ToString();

                    url = uriBuilder.ToString();
                    response = await APIResponseProvider.GetMethod(url, accessTokenObj.Token, getRequiredField);
                }
                else if (getApiEvent.Method == "POST")
                {
                    response = await APIResponseProvider.PostMethod(url, accessTokenObj.Token, getApiEvent.Parameters, getRequiredField);
                }
                else
                {
                    response = $"Unsupported HTTP method: {getApiEvent.Method} for apiEventId {apiEventId}.";
                }
            }
            else
            {
                response = accessTokenObj.Message;
            }

            results = response;

            return results;
        }

        //private static TokenDetails GenerateToken(DateTime tokenExpireDate, string clientId, string clientSecret, IConfiguration configuration)
        //{
        //    string screctKey = configuration["JWTTokenSettings:Secret"] ?? "";
        //    string IssuerURL = configuration["JWTTokenSettings:Issuer"] ?? "";
        //    //double expiryHours = Convert.ToDouble(configuration["JWTTokenSettings:SessionTimeOut"] ?? "");

        //    if (DateTime.UtcNow > tokenExpireDate.Date)
        //    {
        //        return new TokenDetails
        //        {
        //            Message = "Your token date has expired.",
        //            IsSuccess = false
        //        };
        //    }

        //    // authentication successful so generate jwt token
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(screctKey);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Issuer = IssuerURL,
        //        Subject = new ClaimsIdentity(new Claim[]
        //          {
        //          new Claim("client_id", clientId),
        //          new Claim("client_secret", clientSecret)
        //          }),
        //        Expires = tokenExpireDate,
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);

        //    TokenDetails tokenObj = new();
        //    tokenObj.Token = tokenHandler.WriteToken(token);
        //    tokenObj.IsSuccess = true;
        //    tokenObj.Message = "Token successfully generated.";
        //    return tokenObj;
        //}
   
    }

}
