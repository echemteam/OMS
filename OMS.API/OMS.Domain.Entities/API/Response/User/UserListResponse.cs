namespace OMS.Domain.Entities.API.Response.User
{
    public class UserListResponse
    {
        public short? UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
