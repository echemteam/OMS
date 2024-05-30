namespace OMS.Domain.Entities.API.Request.Security
{
    public class AddSecurityPermissionsRequestList
    {
        public List<SecurityPermissionsTypeList>? SecurityPermissionsList { get; set; }
    }

    public class SecurityPermissionsTypeList
    {
        public byte SecuritySettingId { get; set; }
        public short SecurityKeyId { get; set; }
        public byte RoleId { get; set; }
    }
}
