namespace OMS.Domain.Entities.API.Response.User
{
    public class GetAllUserResponse
    {   
        public short? UserId { get; set; }
        public string? FullName { get; set; }
        public byte? RoleId { get; set; }
        public string? RoleName { get; set; }
    }
}
