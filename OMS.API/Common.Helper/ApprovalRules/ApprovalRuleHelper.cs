using Common.Helper.ReplacePlaceholders;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.API.Response.EmailTemplates;
using OMS.Domain.Entities.Entity.Approval;
using System.Text.Json;

namespace Common.Helper.ApprovalRules
{
    public class ApprovalRuleHelper
    {
        public static async Task<ApprovalRequestsDto> ProcessApprovalRequest<T>(string? existingRequestData, T newRequestData, short currentUserId, GetTemplateByFunctionalityEventIdResponse formatTemplate, GetApprovalConfigurationResponse matchingRule, bool isMultiple = false)
        {
            var existingValueJson = existingRequestData is string ? existingRequestData.ToString() : JsonSerializer.Serialize(existingRequestData);
            var newValueJson = newRequestData is string ? newRequestData.ToString() : JsonSerializer.Serialize(newRequestData);

            ApprovalRequestsDto approvalRequest = new()
            {
                NewValue = string.IsNullOrWhiteSpace(newValueJson) || newValueJson == "null" || newValueJson == "{}" ? null : newValueJson,
                OldValue = string.IsNullOrWhiteSpace(existingValueJson) || existingValueJson == "null" || existingValueJson == "{}" ? null : existingValueJson,
                ModuleId = matchingRule.ModuleId,
                FunctionalityId = matchingRule.FunctionalityId,
                TableId = matchingRule.TableId,
                FunctionalitiesFieldId = matchingRule.FunctionalitiesFieldId,
                FunctionalityEventId = matchingRule.FunctionalityEventId,
                RequestedByUserId = currentUserId
            };
            if (formatTemplate != null && !string.IsNullOrWhiteSpace(formatTemplate.Template))
            {
                if (!string.IsNullOrWhiteSpace(existingValueJson) && existingValueJson != "{}" && existingValueJson != "null" && existingValueJson != null)
                {
                    approvalRequest.OldValueTemplate = ReplacePlaceholdersHelper.ProcessTemplate(existingValueJson, formatTemplate.Template, isMultiple);
                }
                if (!string.IsNullOrWhiteSpace(newValueJson) && newValueJson != "{}" && newValueJson != "null" && newValueJson != null)
                {
                    approvalRequest.NewValueTemplate = ReplacePlaceholdersHelper.ProcessTemplate(newValueJson, formatTemplate.Template, isMultiple);
                }
            }
            return approvalRequest;
        }
        //public static Dictionary<string, object> ParseJson(string jsonData)
        //{
        //    var jsonDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonData);
        //    return jsonDict!.ToDictionary(
        //        kvp => kvp.Key,
        //        kvp => (object)kvp.Value.ToString()
        //    );
        //}
        public static Dictionary<string, object> FiledParseJson(string jsonData)
        {
            // Deserialize JSON to a dictionary with string keys and values of type object
            var jsonDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonData);
            return jsonDict!.ToDictionary(
                kvp => kvp.Key,
                kvp => (object)kvp.Value.ToString()  // Convert JsonElement to string
            );
        }

        public static Dictionary<string, object> ParseJson(string jsonData)
        {
            var parameters = new Dictionary<string, object>();

            try
            {
                var jsonDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonData);

                foreach (var kvp in jsonDict)
                {
                    var key = $"@{kvp.Key.ToLower()}"; // Normalize key to lower case to match mapping
                    var value = kvp.Value;

                    // Handle specific JSON types
                    object parameterValue;
                    switch (value.ValueKind)
                    {
                        case JsonValueKind.Null:
                            parameterValue = DBNull.Value; // Use DBNull.Value for SQL NULL values
                            break;

                        case JsonValueKind.String:
                            parameterValue = value.GetString();
                            break;

                        case JsonValueKind.Number:
                            // Handle number types (integer, decimal)
                            parameterValue = value.TryGetDecimal(out var decimalValue) ? (object)decimalValue : value.GetInt32();
                            break;

                        case JsonValueKind.True:
                        case JsonValueKind.False:
                            parameterValue = value.GetBoolean();
                            break;

                        case JsonValueKind.Object:
                        case JsonValueKind.Array:
                            parameterValue = value.GetRawText(); // Serialize object/array to JSON string if needed
                            break;

                        default:
                            parameterValue = value.ToString(); // Fallback for other types
                            break;
                    }

                    parameters[key] = parameterValue!;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing JSON: {ex.Message}");
            }

            return parameters;
        }

        private string BuildUpdateQuery(string tableName, string fieldName, string primaryKeyColumn)
        {
            var query = $@"
            UPDATE {tableName}
            SET {fieldName} = @{fieldName}WHERE {primaryKeyColumn} = @{primaryKeyColumn};";
            return query;
        }
        private string BuildInsertQuery(string tableName, string fieldName, string primaryKeyColumn)
        {
            var query = $@"
            INSERT INTO {tableName} ({primaryKeyColumn}, {fieldName})VALUES (@{primaryKeyColumn}, @{fieldName});
            "; return query;
        }
        public static bool ValidateField(Dictionary<string, object> newValues, string fieldName, HashSet<string> validColumns, out object newFieldValue)
        {
            var normalizedFieldName = fieldName.ToLower();
            if (!newValues.ContainsKey(normalizedFieldName) || !validColumns.Contains(normalizedFieldName))
            {
                newFieldValue = null!;
                return false;
            }

            newFieldValue = newValues[normalizedFieldName];
            return true;
        }

        public static bool ValidatePrimaryKey(object primaryKeyValue, out int key)
        {
            key = Convert.ToInt32(primaryKeyValue);
            return key > 0;
        }

        public static bool CheckForChanges(object newFieldValue, object oldFieldValue)
        {
            return !newFieldValue.ToString()!.Equals(oldFieldValue.ToString(), StringComparison.Ordinal);
        }
    }
}
