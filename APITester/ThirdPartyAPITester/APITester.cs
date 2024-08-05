using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using ThirdPartyAPITester.Helper;
using ThirdPartyAPITester.Model;

namespace ThirdPartyAPITester
{
    public class APITester
    {
        private static readonly HttpClient HttpClient = new();

        //static async Task Main(string[] args)
        //{
        //    Console.WriteLine("Starting API Test...");

        //    //Example providerId for GetApiAuthentications

        //   int apiEventId = 14;

        //    //Call APITest for GET endpoint

        //   string testResult = await ThirdPartyAPITest(apiEventId);

        //    Console.WriteLine($"API Test Result: {testResult}");
        //}

        public static async Task<string> ThirdPartyAPITest(int apiEventId)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("APITesterAppSettings.json").Build();
            string OMSConnection = configuration["ConnectionStrings:OMS"] ?? "";

            ImportHelper helper = new(new APITesterDapperContext(OMSConnection));

            // Get the list of API providers based on apiEventId
            APIEvent getApiEvent = await helper.GetAPIEndPointByApiEventId(apiEventId);

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

            string url = getApiEvent.BaseURL;
            string response;

            string clientId = Guid.NewGuid().ToString();
            string clientSecret = GenerateSecureKey();

            TokenDetails tokenObj = GenerateToken(getApiEvent.TokenExpireDate, clientId, clientSecret, configuration);

            if (tokenObj.IsSuccess == true && tokenObj.Token != null)
            {
                List<APIRequiredFields> getRequiredField = await APIRequiredFields(helper, apiEventId);
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
                    response = await TestGetEndpoint(url, tokenObj.Token, getRequiredField);
                }
                else if (getApiEvent.Method == "POST")
                {
                    response = await TestPostEndpoint(url, tokenObj.Token, getApiEvent.Parameters, getRequiredField);
                }
                else
                {
                    response = $"Unsupported HTTP method: {getApiEvent.Method} for apiEventId {apiEventId}.";
                }
            }
            else
            {
                response = tokenObj.Message;
            }

            results = response;

            return results;
        }

        private static TokenDetails GenerateToken(DateTime tokenExpireDate, string clientId, string clientSecret, IConfiguration configuration)
        {
            string screctKey = configuration["JWTTokenSettings:Secret"] ?? "";
            string IssuerURL = configuration["JWTTokenSettings:Issuer"] ?? "";
            //double expiryHours = Convert.ToDouble(configuration["JWTTokenSettings:SessionTimeOut"] ?? "");

            if (DateTime.UtcNow > tokenExpireDate.Date)
            {
                return new TokenDetails
                {
                    Message = "Your token date has expired.",
                    IsSuccess = false
                };
            }

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(screctKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = IssuerURL,
                Subject = new ClaimsIdentity(new Claim[]
                  {
                  new Claim("client_id", clientId),
                  new Claim("client_secret", clientSecret)
                  }),
                Expires = tokenExpireDate,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            TokenDetails tokenObj = new();
            tokenObj.Token = tokenHandler.WriteToken(token);
            tokenObj.IsSuccess = true;
            tokenObj.Message = "Token successfully generated.";
            return tokenObj;
        }

        private static string GenerateSecureKey()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var byteArray = new byte[32]; // 256 bits
                rng.GetBytes(byteArray);
                return Convert.ToBase64String(byteArray);
            }
        }

        public static async Task<string> TestGetEndpoint(string url, string token, List<APIRequiredFields> getRequiredField)
        {
            try
            {
                HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await HttpClient.GetAsync(url);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    // Parse the response data into JObject
                    var responseObject = JObject.Parse(responseData);

                    // Modify the response data using the new function
                    var modifiedResponseObject = ModifyResponseData(responseObject, getRequiredField);

                    return modifiedResponseObject.ToString();
                }
                else
                {
                    // Handle non-success status codes
                    return $"GET request failed with status code: {response.StatusCode}"; // Indicates failure
                }
            }
            catch (Exception ex)
            {
                // Log exception details here if necessary
                return $"Error during GET request: {ex.Message}"; // Indicates failure
            }
        }

        public static async Task<string> TestPostEndpoint(string url, string token, string postData, List<APIRequiredFields> getRequiredField)
        {
            try
            {
                if (postData == null)
                {
                    return "Post data cannot be null for POST request.";
                }

                var stringContent = new StringContent(postData, Encoding.UTF8, "application/json");

                // Send POST request
                HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await HttpClient.PostAsync(url, stringContent);

                // Check response status code
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var responseData = await response.Content.ReadAsStringAsync();

                    // Parse the response data into JObject
                    var responseObject = JObject.Parse(responseData);


                    // Modify the response data using the new function
                    var modifiedResponseObject = ModifyResponseData(responseObject, getRequiredField);

                    return modifiedResponseObject.ToString(); // Return the modified response data

                    //return responseData; // Indicates the endpoint is working
                }
                else
                {
                    string errorBody = await response.Content.ReadAsStringAsync();
                    // Handle non-success status codes
                    return $"POST request failed with status code: {response.StatusCode}"; // Indicates failure
                }
            }
            catch (Exception ex)
            {
                // Log exception details here if necessary
                return $"Error during POST request: {ex.Message}"; // Indicates failure
            }
        }

        private static async Task<List<APIRequiredFields>> APIRequiredFields(ImportHelper helper, int apiEventId)
        {

            return await helper.GetAPIRequiredFieldsByEventId(apiEventId);
        }

        public static JObject ModifyResponseData(JObject responseObject, List<APIRequiredFields> getRequiredField)
        {
            // Determine the structure of the response and extract the relevant part
            var responseDataString = responseObject["responseData"].ToString();
            var responseData = JObject.Parse(responseDataString);

            // Identify the correct path to the data object based on response structure
            JToken dataObject = responseData;
            if (responseData["responseItem"] != null)
            {
                dataObject = responseData["responseItem"]["responseContent"];
            }
            else if (responseData["data"] != null)
            {
                dataObject = responseData["data"];
            }

            if (dataObject is JObject dataObjectJObject)
            {
                // Create a dictionary to map APIResponseFieldName (case-insensitive) to APIRequiredField
                var fieldMappings = getRequiredField.ToDictionary(
                    field => field.APIResponseFieldName.ToLower(),  // Use lower case for case-insensitive comparison
                    field => field.APIRequiredField
                );

                // Create a new JObject to hold the modified data
                var modifiedDataObject = new JObject();

                // Modify the data JSON object based on the mappings
                foreach (var property in dataObjectJObject.Properties().ToList())
                {
                    var key = property.Name.ToLower();  // Convert to lower case for case-insensitive comparison
                    if (fieldMappings.TryGetValue(key, out string newKey))
                    {
                        modifiedDataObject[newKey] = property.Value;
                    }
                    else
                    {
                        // If no mapping is found, keep the original key-value pair
                        modifiedDataObject[property.Name] = property.Value;
                    }
                }

                // Replace the modified "data" object back into the responseData
                if (responseData["responseItem"] != null)
                {
                    responseData["responseItem"]["responseContent"] = modifiedDataObject;
                }
                else
                {
                    responseData["data"] = modifiedDataObject;
                }
            }

            // Replace the modified responseData back into the main responseObject
            responseObject["responseData"] = responseData.ToString();

            // Return the modified response object
            return responseObject;
        }
    }

    //private static JObject ModifyResponseData(JObject responseObject, List<APIRequiredFields> getRequiredField)
    //{
    //    // Extract and parse the nested JSON string in "responseData"
    //    var nestedResponseDataString = responseObject["responseData"].ToString();
    //    var nestedResponseData = JObject.Parse(nestedResponseDataString);

    //    // Assuming the nested response data contains a "data" property which is an object
    //    var dataObject = nestedResponseData["data"] as JObject;

    //    if (dataObject != null)
    //    {
    //        // Create a dictionary to map APIResponseFieldName (case-insensitive) to APIRequiredField
    //        var fieldMappings = getRequiredField.ToDictionary(
    //            field => field.APIResponseFieldName.ToLower(),  // Use lower case for case-insensitive comparison
    //            field => field.APIRequiredField
    //        );

    //        // Create a new JObject to hold the modified data
    //        var modifiedDataObject = new JObject();

    //        // Modify the data JSON object based on the mappings
    //        foreach (var property in dataObject.Properties().ToList())
    //        {
    //            var key = property.Name.ToLower();  // Convert to lower case for case-insensitive comparison
    //            if (fieldMappings.TryGetValue(key, out string newKey))
    //            {
    //                modifiedDataObject[newKey] = property.Value;
    //            }
    //            else
    //            {
    //                // If no mapping is found, keep the original key-value pair
    //                modifiedDataObject[property.Name] = property.Value;
    //            }
    //        }

    //        // Replace the modified "data" object back into the nested response
    //        nestedResponseData["data"] = modifiedDataObject;
    //    }

    //    // Return the modified response object
    //    return nestedResponseData;
    //}
    //}
}
