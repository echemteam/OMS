using ThirdPartyAPILibrary.Model;

namespace OMS.Domain.Entities.Entity.ApiAuthentication
{
    public class ThirdPartyAPICallResponse
    {
        public string? Data { get; set; }
        public string? Message { get; set; }
        public bool IsSuccess { get; set; }
    }
}
