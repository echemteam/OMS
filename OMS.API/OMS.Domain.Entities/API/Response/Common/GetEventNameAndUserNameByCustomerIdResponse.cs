namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetEventNameAndUserNameByCustomerIdResponse
    {
        public string? EventName { get; set; }
        public short? UserId { get; set; }
        public string? UserName { get; set; }
    }
}
