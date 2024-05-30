namespace OMS.Domain.Entities.Entity.CommonEntity
{
    public class ErrorResponse
    {
        public string? ErrorMessage { get; set; }
        public string? MethodName { get; set; }
        public string? StackTrace { get; set; }
        public string? InnerExceptionMessage { get; set; }
        public string? InnerExceptionStackTrace { get; set; }
    }
}
