using System.Collections;
using System.Data;
using System.Globalization;

namespace Common.Helper.ConvertHelper
{
    public class ConvertHelper
    {
        protected ConvertHelper()
        {

        }
        /// <summary>
        /// To convert into Boolean datatype
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static bool ToBoolean(object obj)
        {
            if (obj == null)
            {
                return false;
            }

            return bool.TryParse(obj.ToString(), out bool result) && result;
        }

        /// <summary>
        /// To Convert into DateTime datatype
        /// </summary>
        /// <param name="objDT"></param>
        /// <returns></returns>
        public static DateTime ToDateTime(object objDT)
        {
            if (objDT == null || string.IsNullOrWhiteSpace(objDT.ToString()))
            {
                return DateTime.MinValue;
            }

            if (DateTime.TryParse(objDT.ToString(), CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime result))
            {
                return result;
            }

            return DateTime.MinValue;
        }

        /// <summary>
        /// To convert into Decimal datatype
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static decimal ToDecimal(object obj)
        {
            if (obj == null)
            {
                return 0M;
            }
            decimal decResult = 0M;
            if (decimal.TryParse(Convert.ToString(obj), out decResult))
            {
                return decResult;
            }
            return decResult;
        }
        /// <summary>
        /// To convert into Int32 datatype
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static int ToInt(object obj)
        {
            if (obj == null || string.IsNullOrWhiteSpace(obj.ToString()))
            {
                return 0;
            }

            if (int.TryParse(obj.ToString(), out int result))
            {
                return result;
            }

            return 0;
        }

        /// <summary>
        /// To Convert into Int64 datatype
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static long ToInt64(object obj)
        {
            if (obj == null || string.IsNullOrWhiteSpace(obj.ToString()))
            {
                return 0L;
            }

            if (long.TryParse(obj.ToString(), out long result))
            {
                return result;
            }

            return 0L;
        }

        /// <summary>
        /// To convert into String datatype
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ToString(object obj)
        {
            return obj?.ToString() ?? string.Empty;
        }
        /// <summary>
        /// for converting DataTable to List datatype
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static IList ConvertDataTabelToIList(DataTable dt)
        {
            var list = new List<Hashtable>();

            foreach (DataRow row in dt.Rows)
            {
                var ht = new Hashtable();

                foreach (DataColumn column in dt.Columns)
                {
                    ht[column.ColumnName] = row[column.ColumnName];
                }

                list.Add(ht);
            }

            return list;
        }
        /// <summary>
        /// Convert Null To String
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ConvertDBNullToString(object obj)
        {
            return obj is DBNull ? string.Empty : obj?.ToString() ?? string.Empty;
        }
    }
}
