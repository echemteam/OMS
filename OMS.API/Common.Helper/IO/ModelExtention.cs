using Common.Helper.Utility;

namespace Common.Helper.IO
{
    public static class ModelExtention
    {

        #region "Static Properties"

        public static string? AESKey { get; set; }
        public static string? AESIV { get; set; }
        public static bool IsEncrypt { get; set; }

        #endregion

        #region "API Util"

        /// <summary>
        /// This method use to decrypt the data and conver to the int
        /// used : when we passed querystrying as encrypted mode
        /// </summary>
        /// <param name="apiData">api Query string data</param>
        /// <returns></returns>
        public static int GetQueryInt(this string apiData)
        {
            var decryptedData = EncryptionUtil.AesDecrypt(EncryptionUtil.HexStringToBase64String(apiData),
                                                            AESKey ?? string.Empty,
                                                           AESIV ?? string.Empty,
                                                           IsEncrypt);
            int data = Convert.ToInt32(decryptedData);
            return data;
        }
        #endregion

    }
}
