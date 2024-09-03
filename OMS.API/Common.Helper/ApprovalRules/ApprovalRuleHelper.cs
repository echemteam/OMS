using System.Text.Json;

namespace Common.Helper.ApprovalRules
{
    public class ApprovalRuleHelper
    {
        private readonly string _connectionString;

        public ApprovalRuleHelper(string connectionString)
        {
            _connectionString = connectionString;
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
        public static string BuildUpdateQuery(string tableName, string fieldName, string primaryKeyColumn)
        {
            return $@"
            UPDATE {tableName}
            SET {fieldName} = @{fieldName}
            WHERE {primaryKeyColumn} = @{primaryKeyColumn};
        ";
        }

        public static string BuildInsertQuery(string tableName, string fieldName, string primaryKeyColumn)
        {
            return $@"
            INSERT INTO {tableName} ({primaryKeyColumn}, {fieldName})
            VALUES (@{primaryKeyColumn}, @{fieldName});
        ";
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
