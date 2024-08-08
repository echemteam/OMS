using Newtonsoft.Json.Linq;
using Polly;
using System.Net.Http.Headers;
using ThirdPartyAPILibrary.Model;

namespace ThirdPartyAPILibrary.Services
{
    public class TokenManagementService
    {
        private TokenDetails tokenObj;
        private DateTime _expiryTime;
        private string _clientId;
        private string _accessToken;
        private string _clientSecret;
        private string _tokenEndpoint;
        private DateTime? _tokenExpireDate;

        public void Configure(string clientId, string clientSecret, string tokenEndpoint, string token, DateTime tokenExpiryTime, DateTime? tokenExpireDate = null)
        {
            _clientId = clientId;
            _clientSecret = clientSecret;
            _tokenEndpoint = tokenEndpoint;
            _tokenExpireDate = tokenExpireDate;
            _expiryTime = tokenExpiryTime;
            _accessToken = token;
        }

        public async Task<TokenDetails> GetAccessTokenAsync()
        {
            if (_accessToken == null || DateTime.UtcNow >= _expiryTime)
            {
                await RetrieveTokenAsync();
            }
            tokenObj.IsSuccess = true;
            tokenObj.Token = _accessToken;
            return tokenObj;

        }

        private async Task RetrieveTokenAsync()
        {
            if (string.IsNullOrEmpty(_clientId) || string.IsNullOrEmpty(_clientSecret) || string.IsNullOrEmpty(_tokenEndpoint))
            {
                tokenObj.Token = "";
                tokenObj.IsSuccess = false;
                tokenObj.Message = ("Token credentials or endpoint are not configured.");
            }

            // Initialize HttpClient directly within the method
            using (var httpClient = new HttpClient())
            {
                var requestBody = new StringContent($"client_id={_clientId}&client_secret={_clientSecret}&grant_type=client_credentials");
                requestBody.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

                var retryPolicy = Policy
                    .Handle<HttpRequestException>()
                    .OrResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
                    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                        (result, timeSpan, retryCount, context) =>
                        {
                            // Uncomment this line if you want to log retries
                            tokenObj.Token = "";
                            tokenObj.IsSuccess = false;
                            tokenObj.Message = ($"Retry {retryCount} of retrieving OAuth token at {timeSpan.Seconds} seconds delay due to {result.Exception?.Message ?? result.Result.ReasonPhrase}");
                        });

                var response = await retryPolicy.ExecuteAsync(() => httpClient.PostAsync(_tokenEndpoint, requestBody));

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var tokenData = JObject.Parse(responseContent);
                    tokenObj.IsSuccess = true;
                    tokenObj.Message = "Token successfully generated.";
                    tokenObj.Token = tokenData.Value<string>("access_token");
                    var expiresIn = tokenData.Value<int>("expires_in");
                    _expiryTime = DateTime.UtcNow.AddSeconds(expiresIn - 60); // Renew token 1 minute before it expires
                    tokenObj.ExpiryTime = _expiryTime;
                }
                else
                {
                    // Uncomment this line if you want to log errors
                    tokenObj.Token = "";
                    tokenObj.IsSuccess = false;
                    tokenObj.Message = ($"Failed to retrieve OAuth token: {response.ReasonPhrase}");
                }
            }
        }
    }
}
