using Newtonsoft.Json.Linq;

namespace Common.Helper.ReplacePlaceholders
{
    public class ReplaceTemplatePlaceholders
    {
        public static string ReplacePlaceholders(string htmlBody, JObject newValueData)
        {
            try
            {
                // Iterate over each property in the JObject
                foreach (var property in newValueData.Properties())
                {
                    // Define the placeholder key
                    string placeholderKey = $"#{property.Name}#";
                    // Get the value of the property
                    string value = property.Value.ToString();
                    // Replace all occurrences of the placeholder in the HTML body
                    htmlBody = htmlBody.Replace(placeholderKey, value);
                }
                return htmlBody;
            }
            catch (Exception ex)
            {
                // Handle the exception, possibly logging it
                throw new ApplicationException("An error occurred while replacing placeholders.", ex);
            }
        }
    }
}
