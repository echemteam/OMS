using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using ThirdPartyAPILibrary.Model;

namespace ThirdPartyAPILibrary.ThirdPartyResponseProvider
{
    public class APIResponseProvider
    {
        private static readonly HttpClient HttpClient = new();

        public static async Task<APIResponse> GetMethod(string url, string token, List<APIRequiredFields> getRequiredField)
        {
            APIResponse results = new();
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

                    results.Data = modifiedResponseObject.ToString();
                    results.Message = "";
                    results.IsSuccess = true;
                    return results;
                }
                else
                {
                    // Handle non-success status codes
                    results.Message = $"GET request failed with status code: {response.StatusCode}"; // Indicates failure
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
                }
            }
            catch (Exception ex)
            {
                // Log exception details here if necessary
                results.Message = $"Error during GET request: {ex.Message}"; // Indicates failure
                results.Data = "";
                results.IsSuccess = false;
                return results;
            }
        }

        public static async Task<APIResponse> PostMethod(string url, string token, string postData, List<APIRequiredFields> getRequiredField)
        {
            APIResponse results = new();
            try
            {
                if (postData == null)
                {
                    results.Message = "Post data cannot be null for POST request.";
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
                }
                if (getRequiredField == null)
                {
                    results.Message = "Required fields list cannot be null.";
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
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

                    results.Data = modifiedResponseObject.ToString(); // Return the modified response data
                    results.Message = "";
                    results.IsSuccess = true;
                    return results;

                    //return responseData; // Indicates the endpoint is working
                }
                else
                {
                    string errorBody = await response.Content.ReadAsStringAsync();
                    // Handle non-success status codes
                    results.Message = $"POST request failed with status code: {response.StatusCode}"; // Indicates failure
                    results.Data = "";
                    results.IsSuccess = false;
                    return results;
                }
            }
            catch (Exception ex)
            {
                // Log exception details here if necessary
                results.Message = $"Error during POST request: {ex.Message}"; // Indicates failure
                results.Data = "";
                results.IsSuccess = false;
                return results;
            }
        }

        public static JObject ModifyResponseData(JObject responseObject, List<APIRequiredFields> getRequiredField)
        {
            // Create a dictionary to map APIResponseFieldName (case-insensitive) to APIRequiredField
            var fieldMappings = getRequiredField.ToDictionary(
                field => field.APIResponseFieldName?.ToLower() ?? string.Empty,  // Use lower case for case-insensitive comparison
                field => field.APIRequiredField
            );

            try
            {
                // Check if 'data' exists and process based on its type
                if (responseObject["data"] is JArray dataArray)
                {
                    // Modify the data array
                    responseObject["data"] = ModifyDataArray(dataArray, fieldMappings);
                }
                else if (responseObject["data"] is JObject dataObjectJObject)
                {
                    // Modify the single data object
                    responseObject["data"] = ModifyDataObject(dataObjectJObject, fieldMappings);
                }

                // Return the modified response object
                return responseObject;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private static JObject ModifyDataObject(JObject dataObjectJObject, Dictionary<string, string> fieldMappings)
        {
            // Create a new JObject to hold the modified data
            var modifiedDataObject = new JObject();

            // Modify the data JSON object based on the mappings
            foreach (var property in dataObjectJObject.Properties().ToList())
            {
                var key = property.Name.ToLower();  // Convert to lower case for case-insensitive comparison
                if (fieldMappings.ContainsKey(key))
                {
                    string newKey = fieldMappings[key];
                    modifiedDataObject[newKey] = property.Value;
                }
            }

            return modifiedDataObject;
        }

        private static JArray ModifyDataArray(JArray dataArray, Dictionary<string, string> fieldMappings)
        {
            // Create a new JArray to hold the modified data
            var modifiedDataArray = new JArray();

            // Iterate through each object in the data array
            foreach (var item in dataArray)
            {
                if (item is JObject dataObjectJObject)
                {
                    // Modify each item using the ModifyDataObject method
                    var modifiedDataObject = ModifyDataObject(dataObjectJObject, fieldMappings);
                    modifiedDataArray.Add(modifiedDataObject);
                }
            }

            return modifiedDataArray;
        }

        
    }
}
