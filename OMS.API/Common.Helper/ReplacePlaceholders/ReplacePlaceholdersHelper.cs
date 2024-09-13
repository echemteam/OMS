using Newtonsoft.Json.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Common.Helper.ReplacePlaceholders
{
    public class ReplacePlaceholdersHelper
    {
        public static string ProcessTemplate(string jsonValue, string template)
        {

            try
            {
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
                case "emaillist":
                    return template.Replace("#EmailList#", listHtml);

                case "phonelist":
                    return template.Replace("#PhoneList#", listHtml);

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
    }
}
