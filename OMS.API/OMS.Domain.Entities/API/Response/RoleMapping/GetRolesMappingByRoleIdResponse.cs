namespace OMS.Domain.Entities.API.Response.RoleMapping
{
    public class GetRolesMappingByRoleIdResponse
    {
        public int? UserRoleId { get; set; }
        public byte? RoleId { get; set; }
        public string? RoleName { get; set; }
        public short? UserId { get; set; }
        public string? UserName { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
