namespace OMS.Domain.Entities.API.Request.User
{
    public class AddUserLoginLogoutHistoryRequest
    {
        public short? UserId { get; set; }
        public bool? IsLogin { get; set; }
    }
}
