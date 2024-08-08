using ClientIPAuthentication.Helper.DB_Helper;
using ClientIPAuthentication.Model;
using System.Data;

namespace ClientIPAuthentication.Helper
{
    public class GetIPAddressHelper : BaseConnectionDapperContext
    {
        public GetIPAddressHelper(ConnectionDapperContext connectionDapperContext) : base(connectionDapperContext)
        {

        }

        /// <summary>
        /// Get IP Request With HttpClient
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public async Task<GetWhiteListIPAddressResponce> GetWhiteListIPAddress(string remoteIPAddress)
        {
            try
            {
                const string storedProcedure = "GetWhiteListIPAddress";
                var result = await _context.GetFrist<GetWhiteListIPAddressResponce>(storedProcedure, new { remoteIPAddress }, CommandType.StoredProcedure);
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
