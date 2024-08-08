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

        public static async Task<string> GetMethod(string url, string token, List<APIRequiredFields> getRequiredField)
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

        public static async Task<string> PostMethod(string url, string token, string postData, List<APIRequiredFields> getRequiredField)
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
}
