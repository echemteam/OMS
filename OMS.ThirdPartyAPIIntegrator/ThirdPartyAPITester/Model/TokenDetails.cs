namespace ThirdPartyAPILibrary.Model
{
    public class TokenDetails
    {
        public string? Token { get; set; }
        public DateTime ExpiryTime { get; set; }
        public bool? IsSuccess { get; set; }
        public string Message { get; set; }
    }
}
