using System.ComponentModel;
using System.Data;

namespace Common.Helper.Export
{
    public static class ExportHelper
    {
        public static DataTable ListToDataTable<T>(List<T> data)
        {
            try
            {
                PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
                DataTable dataTable = new();

                for (int i = 0; i < properties.Count; i++)
                {
                    PropertyDescriptor property = properties[i];
                    dataTable.Columns.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
                }

                object[] values = new object[properties.Count];
                foreach (T item in data)
                {
                    for (int i = 0; i < values.Length; i++)
                    {
                        object? v = properties[i]?.GetValue(item);
                        values[i] = v ?? DBNull.Value; // Handle null by assigning DBNull.Value
                    }

                    dataTable.Rows.Add(values);
                }
                return dataTable;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Something wrong while converting dataTable to list", ex);
            }
        }
    }
}
