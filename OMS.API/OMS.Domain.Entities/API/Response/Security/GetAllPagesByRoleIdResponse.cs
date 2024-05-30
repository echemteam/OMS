namespace OMS.Domain.Entities.API.Response.Security
{
    public class GetAllPagesByRoleIdResponse
    {
        public short SecurityKeyId { get; set; }
        public short SecurityKeyParentId { get; set; }
        public string? SecurityKeyName { get; set; }
        public bool IsMenu { get; set; }
        public int SecurityPermissionId { get; set; }
        public byte SecuritySettingId { get; set; }
        public string? SecuritySettingName { get; set; }
        public byte RoleId { get; set; }
        public bool GrantDenyFlag { get; set; }
        public short DisplayOrder { get; set; }
    }
}
