namespace OMS.Domain.Entities.API.Response.Approval
{
    public class CheckFieldValueExistsResponse
    {
        public bool? Exist { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
