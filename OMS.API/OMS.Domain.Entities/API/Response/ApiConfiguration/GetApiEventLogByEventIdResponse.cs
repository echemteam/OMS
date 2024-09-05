namespace OMS.Domain.Entities.API.Response.ApiConfiguration
{
    public class GetApiEventLogByEventIdResponse
    {
        public int? EventLogLogId { get; set; }
        public int? EventId { get; set; }
        public string? EventName { get; set; }
        public DateTime? EventRunDate { get; set; }
        public string? RequestData { get; set; }
        public string? ResponseData { get; set; }
        public string? StatusCode { get; set; }
        public string? ErrorMessage { get; set; }
        public string? LogType { get; set; }
    }
}
