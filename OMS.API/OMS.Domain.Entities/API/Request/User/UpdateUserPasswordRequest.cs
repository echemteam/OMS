namespace OMS.Domain.Entities.API.Request.User
{
    public class UpdateUserPasswordRequest
    {
        public short? UserId { get; set; }
        public string? Password { get; set; }
    }
}
