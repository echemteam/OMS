namespace OMS.Domain.Entities.API.Request.User
{
    public class UpdateUserRequest
    {
        public short? UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public bool? IsActive { get; set; }
    }
}
