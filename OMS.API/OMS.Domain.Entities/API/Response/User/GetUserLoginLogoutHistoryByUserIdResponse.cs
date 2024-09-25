namespace OMS.Domain.Entities.API.Response.User
{
    public class GetUserLoginLogoutHistoryByUserIdResponse
    {
        public int? UserHistoryId { get; set; }
        public short? UserId { get; set; }
        public string? UserName { get; set; }
        public DateTime? UserLoginDateTime { get; set; }
        public DateTime? UserLogoutDateTime { get; set; }
        public string? IPAddress { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
