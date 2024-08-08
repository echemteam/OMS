namespace ThirdPartyAPILibrary.Model
{
    public class ThirdPartyAPICallRequest
    {
        public string? EventName { get; set; }
        public string? Parameters { get; set; }
        public bool IsDynamicParameter { get; set; }
    }
}
