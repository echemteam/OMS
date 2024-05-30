namespace OMS.Domain.Entities.Entity.CommonEntity
{
    public class ExceptionLogDTO
    {
        public long ErrorLogId { get; set; }
        public string? ModuleName { get; set; }
        public string? CustomErrorMessage { get; set; }
        public string? TrackTrace { get; set; }
        public string? SystemErrorMessage { get; set; }
        public string? InnerTrackTrace { get; set; }
        public string? InnerSystemErrorMessage { get; set; }
        public string? LogType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? IPAddress { get; set; }
    }
}
