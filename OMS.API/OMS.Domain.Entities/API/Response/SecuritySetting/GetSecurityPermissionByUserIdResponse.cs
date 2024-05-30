namespace OMS.Domain.Entities.API.Response.SecuritySetting
{
    public class GetSecurityPermissionByUserIdResponse
    {
        public string? SecurityKeyName { get; set; }
        public bool? IsMenu { get; set; }
        public int? SecurityKeyParentId { get; set; }
        public int? SecuritySettingId { get; set; }
    }
}
