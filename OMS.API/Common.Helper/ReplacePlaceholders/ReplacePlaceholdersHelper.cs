using Newtonsoft.Json.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Common.Helper.ReplacePlaceholders
{
    public class ReplacePlaceholdersHelper
    {
        public static string ProcessTemplate(string jsonValue, string template, bool isMultiple = false)
        {

            try
            {
                if (isMultiple)
                {
                    return ProcessMultipleTemplate(jsonValue, template); 

                }
                var data = JObject.Parse(jsonValue).ToObject<Dictionary<string, object>>();
                var dataList = new List<Dictionary<string, object>>();

                foreach (var entry in data!)
                {
                    if (entry.Value is JArray jArray)
                    {
                        var listData = jArray.ToObject<List<Dictionary<string, object>>>();
                        template = ReplaceListPlaceholders(template, entry.Key, listData!);
                        if (!listData!.Any())
                        {
                            template = template.Replace($"#{entry.Key}#", "No data available");
                        }
                    }
                }
                template = ReplacePlaceholders(template, data.ToDictionary(p => $"#{p.Key}#", p => p.Value?.ToString() ?? string.Empty));

                // Replace any unreplaced placeholders with "NA"
                return ReplaceUnreplacedPlaceholdersWithNA(template);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error processing template placeholder", ex);
            }
        }

        public static string ReplaceListPlaceholders(string template, string listName, List<Dictionary<string, object>> dataList)
        {
            var listHtml = GenerateTableHtml(dataList);

            switch (listName.ToLower())
            {
                case "EmailAddressList":
                    return template.Replace("#EmailAddressList#", listHtml);

                case "PhoneNumberList":
                    return template.Replace("#PhoneNumberList#", listHtml);

                // Add cases for future lists here
                default:
                    return ReplacePlaceholdersWithTable(template, dataList, new Dictionary<string, object>(), $"#{listName}#");
            }
        }

        public static string ReplacePlaceholdersWithTable(string htmlBody, List<Dictionary<string, object>> dataList, Dictionary<string, object> tempBody, string placeholder = "#Table#")
        {
            try
            {
                var tableHtml = GenerateTableHtml(dataList);
                htmlBody = htmlBody.Replace(placeholder, tableHtml);

                var placeholders = tempBody.ToDictionary(p => $"#{p.Key}#", p => p.Value?.ToString() ?? string.Empty);
                return ReplacePlaceholders(htmlBody, placeholders);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error generating HTML table and replacing placeholders", ex);
            }
        }



        private static string ReplaceUnreplacedPlaceholdersWithNA(string template)
        {
            var regex = new Regex(@"#\w+#");
            return regex.Replace(template, "NA");
        }

        private static string GenerateTableHtml(List<Dictionary<string, object>> dataList)
        {
            var tableHtml = new StringBuilder();
            tableHtml.AppendLine("<table border='1' style='max-width: 800px; width: 100%;' cellspacing='0' cellpadding='5'>");

            if (dataList != null && dataList.Count > 0)
            {
                var headers = dataList.FirstOrDefault()?.Keys;
                if (headers != null)
                {
                    tableHtml.AppendLine("<thead><tr>");
                    foreach (var header in headers)
                    {
                        tableHtml.AppendLine($"<th style='font-family:Arial, sans-serif; font-size:12px; padding:5px;'>{header}</th>");
                    }
                    tableHtml.AppendLine("</tr></thead>");
                }

                tableHtml.AppendLine("<tbody>");
                foreach (var row in dataList)
                {
                    tableHtml.AppendLine("<tr>");
                    foreach (var header in headers!)
                    {
                        tableHtml.AppendLine($"<td style='font-family:Arial, sans-serif; font-size:12px; padding:5px;'>{(row.ContainsKey(header) ? row[header]?.ToString() : string.Empty)}</td>");
                    }
                    tableHtml.AppendLine("</tr>");
                }
                tableHtml.AppendLine("</tbody>");
            }
            else
            {
                tableHtml.AppendLine("<tr><td colspan='100%' style='text-align:center;'>No data available</td></tr>");
            }

            tableHtml.AppendLine("</table>");
            return tableHtml.ToString();
        }


        public static string ProcessMultipleTemplate(string jsonValue, string template)
        {
            try
            {
                var data = JObject.Parse(jsonValue);
                var placeholders = new Dictionary<string, string>();

                // Flatten the JSON structure to match placeholders
                FlattenJson(data, placeholders, string.Empty);

                // Replace placeholders in the template
                return ReplacePlaceholders(template, placeholders);

            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error processing template placeholder", ex);
            }


        }

        private static void FlattenJson(JToken token, Dictionary<string, string> placeholders, string parentKey)
        {
            foreach (var property in token.Children<JProperty>())
            {
                var key = string.IsNullOrEmpty(parentKey) ? property.Name : $"{parentKey}.{property.Name}";

                if (property.Value.Type == JTokenType.Object)
                {
                    FlattenJson(property.Value, placeholders, key);
                }
                else if (property.Value.Type == JTokenType.Array)
                {
                    // Handle arrays if necessary; you may need to adjust this logic
                    var index = 0;
                    foreach (var item in property.Value.Children())
                    {
                        FlattenJson(item, placeholders, $"{key}[{index}]");
                        index++;
                    }
                }
                else
                {
                    placeholders[$"##{key}##"] = property.Value?.ToString() ?? string.Empty;
                }
            }
        }
        public static string ReplacePlaceholders(string htmlBody, Dictionary<string, string> placeholders)
        {
            try
            {
                foreach (var placeholder in placeholders)
                {
                    htmlBody = htmlBody.Replace(placeholder.Key, placeholder.Value);
                }
                return htmlBody;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error replacing placeholders", ex);
            }
        }
    }
}
