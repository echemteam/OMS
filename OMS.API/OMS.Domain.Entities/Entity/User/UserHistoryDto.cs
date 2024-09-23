using System.Net;

namespace OMS.Domain.Entities.Entity.User
{
    public class UserHistoryDto 
    {
        public int? UserHistoryId { get; set; }
        public short? UserId { get; set; }
        public DateTime? UserLoginDateTime { get; set; }
        public DateTime? UserLogoutDateTime { get; set; }
        public string? IPAddress { get; set; }
        public bool? IsLogin { get; set; }
    }
}
