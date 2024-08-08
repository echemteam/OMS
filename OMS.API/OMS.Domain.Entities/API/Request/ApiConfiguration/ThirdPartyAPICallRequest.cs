namespace OMS.Domain.Entities.API.Request.ApiConfiguration
{
    public class ThirdPartyAPICallRequest
    {
        public string EventName { get; set; }
        public string? Parameters { get; set; }
        public bool IsDynamicParameter { get; set; }
    }
}
