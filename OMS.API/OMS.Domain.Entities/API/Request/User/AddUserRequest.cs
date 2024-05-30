namespace OMS.Domain.Entities.API.Request.User
{
    public class AddUserRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public bool? IsActive { get; set; }
    }
}
