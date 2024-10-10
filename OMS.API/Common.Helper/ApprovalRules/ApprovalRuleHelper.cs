using System.Text.Json;

namespace Common.Helper.ApprovalRules
{
    public class ApprovalRuleHelper
    {
        public static async Task<ApprovalRequestsDto> ProcessApprovalRequest<T>(string? existingRequestData, T newRequestData, short currentUserId, GetTemplateByFunctionalityEventIdResponse formatTemplate, GetApprovalConfigurationResponse matchingRule, bool isMultiple = false)
        {
            var existingValueJson = existingRequestData != null ? existingRequestData is string ? existingRequestData.ToString() : JsonSerializer.Serialize(existingRequestData) : null;
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
                RequestedByUserId = currentUserId,
                IsFunctional = matchingRule.IsFunctional
            };
            if (formatTemplate != null && !string.IsNullOrWhiteSpace(formatTemplate.Template))
            {
                if (!string.IsNullOrWhiteSpace(existingValueJson) && existingValueJson != "{}" && existingValueJson != "null" && existingValueJson != null)
                {
                    approvalRequest.OldValueTemplate = ReplacePlaceholdersHelper.ProcessTemplate(existingValueJson, newValueJson, formatTemplate.Template, true, approvalRequest.IsFunctional, isMultiple);
                }
                if (!string.IsNullOrWhiteSpace(newValueJson) && newValueJson != "{}" && newValueJson != "null" && newValueJson != null)
                {
                    approvalRequest.NewValueTemplate = ReplacePlaceholdersHelper.ProcessTemplate(newValueJson, existingValueJson, formatTemplate.Template, false, approvalRequest.IsFunctional, isMultiple);
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

        public static bool CheckValuesChanged(string existingDataJson, string requestDataJson)
        {
            try
            {
                if (existingDataJson == null || requestDataJson == null)
                {
                    throw new ArgumentNullException("Both objects must be non-null.");
                }

                var existingDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(existingDataJson);
                var requestDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(requestDataJson);

                var commonKeys = existingDict.Keys.Intersect(requestDict.Keys);

                foreach (var key in commonKeys)
                {
                    if (!AreValuesEqual(existingDict[key], requestDict[key]))
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                throw ex; 
            }
        }

        // Recursive helper method to compare JsonElements, ignoring data type differences
        private static bool AreValuesEqual(JsonElement existingValue, JsonElement requestValue)
        {
            try
            {
                if (existingValue.ValueKind == JsonValueKind.Null && requestValue.ValueKind == JsonValueKind.Null)
                {
                    return true;
                }

                if (existingValue.ValueKind == JsonValueKind.Array || requestValue.ValueKind == JsonValueKind.Array)
                {
                    return CompareArrays(existingValue, requestValue);
                }

                if (existingValue.ValueKind == JsonValueKind.Object || requestValue.ValueKind == JsonValueKind.Object)
                {
                    return CompareObjects(existingValue, requestValue);
                }

                if (existingValue.ValueKind == requestValue.ValueKind)
                {
                    if (existingValue.ValueKind == JsonValueKind.Number)
                    {
                        if (existingValue.TryGetDecimal(out var existingDecimal) && requestValue.TryGetDecimal(out var requestDecimal))
                        {
                            return Math.Abs(existingDecimal - requestDecimal) < 0.0001m;
                        }
                    }
                    return existingValue.ToString() == requestValue.ToString();
                }
                if (existingValue.ValueKind == JsonValueKind.Number && requestValue.ValueKind == JsonValueKind.String)
                {
                    if (decimal.TryParse(requestValue.GetString(), out var requestDecimal))
                    {
                        return existingValue.TryGetDecimal(out var existingDecimal) &&
                               Math.Abs(existingDecimal - requestDecimal) < 0.0001m;
                    }
                }
                else if (existingValue.ValueKind == JsonValueKind.String && requestValue.ValueKind == JsonValueKind.Number)
                {
                    if (decimal.TryParse(existingValue.GetString(), out var existingDecimal))
                    {
                        return requestValue.TryGetDecimal(out var requestDecimal) &&
                               Math.Abs(existingDecimal - requestDecimal) < 0.0001m;
                    }
                }

                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private static bool CompareObjects(JsonElement existingValue, JsonElement requestValue)
        {
            try
            {
                if (existingValue.ValueKind != JsonValueKind.Object || requestValue.ValueKind != JsonValueKind.Object)
                {
                    return false;
                }

                var existingDict = existingValue.EnumerateObject().ToDictionary(p => p.Name, p => p.Value);
                var requestDict = requestValue.EnumerateObject().ToDictionary(p => p.Name, p => p.Value);

                var commonKeys = existingDict.Keys.Intersect(requestDict.Keys);

                foreach (var key in commonKeys)
                {
                    if (!AreValuesEqual(existingDict[key], requestDict[key]))
                    {
                        return false; 
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private static bool CompareArrays(JsonElement existingArray, JsonElement requestArray)
        {
            try
            {
                if (existingArray.ValueKind == JsonValueKind.Null || (existingArray.ValueKind == JsonValueKind.Array && existingArray.GetArrayLength() == 0))
                {
                    return requestArray.ValueKind == JsonValueKind.Null || (requestArray.ValueKind == JsonValueKind.Array && requestArray.GetArrayLength() == 0);
                }

                if (existingArray.ValueKind != JsonValueKind.Array || requestArray.ValueKind != JsonValueKind.Array)
                {
                    return false;
                }

                var existingElements = existingArray.EnumerateArray().ToList();
                var requestElements = requestArray.EnumerateArray().ToList();

                if (existingElements.Count != requestElements.Count)
                {
                    return false; 
                }

                bool elementsHaveUniqueIds = existingElements.All(e => e.ValueKind == JsonValueKind.Object && (e.TryGetProperty("EmailId", out _) || e.TryGetProperty("PhoneId", out _)))
                                           && requestElements.All(e => e.ValueKind == JsonValueKind.Object && (e.TryGetProperty("EmailId", out _) || e.TryGetProperty("PhoneId", out _)));
                if (elementsHaveUniqueIds)
                {
                    var existingDict = new Dictionary<string, JsonElement>();
                    var requestDictMap = new Dictionary<string, JsonElement>();

                    foreach (var elem in existingElements)
                    {
                        string key = GetUniqueKey(elem);
                        if (key != null)
                        {
                            existingDict[key] = elem;
                        }
                        else
                        {
                            existingDict[elem.ToString()] = elem;
                        }
                    }
                    foreach (var elem in requestElements)
                    {
                        string key = GetUniqueKey(elem);
                        if (key != null)
                        {
                            requestDictMap[key] = elem;
                        }
                        else
                        {
                            requestDictMap[elem.ToString()] = elem;
                        }
                    }
                    foreach (var key in existingDict.Keys)
                    {
                        if (!AreValuesEqual(existingDict[key], requestDictMap[key]))
                        {
                            return false;
                        }
                    }
                    return true;
                }
                else
                {
                    foreach (var existingElem in existingElements)
                    {
                        bool matchFound = requestElements.Any(reqElem => AreValuesEqual(existingElem, reqElem));
                        if (!matchFound)
                        {
                            return false;
                        }
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private static string GetUniqueKey(JsonElement element)
        {
            if (element.TryGetProperty("EmailId", out JsonElement emailId))
            {
                return $"EmailId:{emailId.GetInt32()}";
            }
            if (element.TryGetProperty("PhoneId", out JsonElement phoneId))
            {
                return $"PhoneId:{phoneId.GetInt32()}";
            }
            return null!;
        }
    }
}
