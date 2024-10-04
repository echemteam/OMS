using Newtonsoft.Json.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Common.Helper.ReplacePlaceholders
{
    public class ReplacePlaceholdersHelper
    {
        public static string ProcessTemplate(string jsonValue, string oldValueJson, string template, bool isOldTemplate, bool isFunctional, bool isMultiple = false)
        {
            try
            {
                if (isMultiple)
                {
                    return ProcessMultipleTemplate(jsonValue, template);

                }
                var data = JObject.Parse(jsonValue).ToObject<Dictionary<string, object>>();
                var oldData = string.IsNullOrWhiteSpace(oldValueJson) ? null : JObject.Parse(oldValueJson).ToObject<Dictionary<string, object>>();
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
                //template = ReplacePlaceholders(template, data.ToDictionary(p => $"#{p.Key}#", p => p.Value?.ToString() ?? string.Empty));

                // Replace placeholders with the comparison of old and new values
                template = ReplacePlaceholdersWithComparison(template, data, oldData, isOldTemplate, isFunctional);

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
                case "emailaddresslist":
                    listHtml = GenerateEmailTableHtml(dataList);
                    return template.Replace("#EmailList#", listHtml);

                case "phonenumberlist":
                    listHtml = GeneratePhoneTableHtml(dataList);
                    return template.Replace("#PhoneList#", listHtml);

                // Add cases for future lists here
                default:
                    return ReplacePlaceholdersWithTable(template, dataList, [], $"#{listName}#");
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
        private static string GenerateEmailTableHtml(List<Dictionary<string, object>> dataList)
        {
            var tableHtml = new StringBuilder();
            tableHtml.AppendLine("<table class='email-table'>");
            tableHtml.AppendLine("<thead><tr><th>Email Address</th><th>Is Primary</th></tr></thead>");
            tableHtml.AppendLine("<tbody>");

            foreach (var row in dataList)
            {
                tableHtml.AppendLine("<tr>");
                tableHtml.AppendLine($"<td>{(row.ContainsKey("EmailAddress") ? row["EmailAddress"]?.ToString() : string.Empty)}</td>");
                tableHtml.AppendLine($"<td>{(row.ContainsKey("IsPrimary") ? row["IsPrimary"]?.ToString() : string.Empty)}</td>");
                tableHtml.AppendLine("</tr>");
            }

            if (dataList.Count == 0)
            {
                tableHtml.AppendLine("<tr><td colspan='2' style='text-align:center;'>No email addresses available</td></tr>");
            }

            tableHtml.AppendLine("</tbody></table>");
            return tableHtml.ToString();
        }
        private static string GeneratePhoneTableHtml(List<Dictionary<string, object>> dataList)
        {
            var tableHtml = new StringBuilder();
            tableHtml.AppendLine("<table class='phone-table'>");
            tableHtml.AppendLine("<thead><tr><th>Phone Number</th><th>Extension</th><th>Is Primary</th></tr></thead>");
            tableHtml.AppendLine("<tbody>");

            foreach (var row in dataList)
            {
                tableHtml.AppendLine("<tr>");
                string phoneCode = row.ContainsKey("PhoneCode") ? $"({row["PhoneCode"]})" : string.Empty;
                string phoneNumber = row.ContainsKey("PhoneNumber") ? row["PhoneNumber"]?.ToString() : string.Empty;
                tableHtml.AppendLine($"<td>{phoneCode} {phoneNumber}</td>");
                tableHtml.AppendLine($"<td>{(row.ContainsKey("PhoneType") ? row["PhoneType"]?.ToString() : string.Empty)}</td>");
                tableHtml.AppendLine($"<td>{(row.ContainsKey("Extension") ? row["Extension"]?.ToString() : string.Empty)}</td>");
                tableHtml.AppendLine($"<td>{(row.ContainsKey("IsPrimary") ? row["IsPrimary"]?.ToString() : string.Empty)}</td>");
                tableHtml.AppendLine("</tr>");
            }

            if (dataList.Count == 0)
            {
                tableHtml.AppendLine("<tr><td colspan='3' style='text-align:center;'>No phone numbers available</td></tr>");
            }

            tableHtml.AppendLine("</tbody></table>");
            return tableHtml.ToString();
        }

        //** This Replace code with highlights for the changes 
        public static string ReplacePlaceholdersWithComparison(string template, Dictionary<string, object> newData, Dictionary<string, object>? oldData, bool isOldTemplate, bool isFunctional)
        {
            foreach (var newItem in newData)
            {
                var placeholder = $"#{newItem.Key}#";
                var newValue = newItem.Value?.ToString() ?? string.Empty;
                if (isFunctional)
                {
                    string oldValue = oldData != null && oldData.ContainsKey(newItem.Key) ? oldData[newItem.Key]?.ToString() ?? string.Empty : string.Empty;
                    if (isOldTemplate)
                    {
                        if (newValue != oldValue)
                        {
                            newValue = $"<span style='color: red;'>{newValue}</span>";
                        }
                    }
                    else
                    {
                        if (newValue != oldValue)
                        {
                            newValue = $"<span style='color: green;'>{newValue}</span>";
                        }
                    }
                }

                template = template.Replace(placeholder, newValue);
            }

            return template;
        }



        //public static string ReplacePlaceholdersWithComparison(string template, Dictionary<string, object> newData, Dictionary<string, object>? oldData)
        //{
        //    foreach (var newItem in newData)
        //    {
        //        var placeholder = $"#{newItem.Key}#";
        //        var newValue = newItem.Value?.ToString() ?? string.Empty;

        //        string oldValue = oldData != null && oldData.ContainsKey(newItem.Key) ? oldData[newItem.Key]?.ToString() ?? string.Empty : string.Empty;

        //        // If the new value is different from the old value, highlight it in green
        //        if (oldValue != null && oldValue != "")
        //        {
        //            if (newValue != oldValue)
        //            {
        //                newValue = $"<span style='color: green;'>{newValue}</span>";
        //            }
        //        }
        //        // Replace the placeholder with the value
        //        template = template.Replace(placeholder, newValue);
        //    }

        //    return template;
        //}
    }

}
