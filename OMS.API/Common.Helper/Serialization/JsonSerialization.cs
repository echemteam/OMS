using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Common.Helper.Serialization
{
    public static class JsonUtility
    {
        public static Formatting JsonFromating => new();

        // Serialize an object to JSON
        public static string ObjectToJson(object obj, Formatting formatting, bool isEmableCamelCase = true)
        {
            try
            {

                return JsonConvert.SerializeObject(obj, formatting, GetCamelCaseResolver());
            }
            catch (Exception ex)
            {
                Exception exception = new($"Error serializing object to JSON: {ex.Message}");
                throw exception;

            }
        }

        public static string ObjectToJson(object obj)
        {
            try
            {
                return JsonConvert.SerializeObject(obj);
            }
            catch (Exception ex)
            {
                Exception exception = new($"Error serializing object to JSON: {ex.Message}");
                throw exception;

            }
        }

        // Deserialize JSON to an object of a specified type
        public static T? JsonToObject<T>(string jsonString)
        {
            try
            {
                if (IsValidJson(jsonString))
                {
                    return JsonConvert.DeserializeObject<T>(jsonString);
                }
                return default(T);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deserializing JSON to object: {ex.Message}");
                return default; // Return the default value for the type (null for reference types, 0 for value types)
            }
        }

        // Check if a string is valid JSON
        public static bool IsValidJson(string jsonString)
        {
            try
            {
                JsonConvert.DeserializeObject(jsonString);
                return true;
            }
            catch (JsonReaderException)
            {
                return false;
            }
        }

        private static JsonSerializerSettings GetCamelCaseResolver()
        {
            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return settings;
        }
    }
}
