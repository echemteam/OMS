namespace OMS.Domain.Entities.Entity.CommonEntity
{
    public class SecurityPermissionsDetails
    {
        public string? SecurityKeyName { get; set; }
        public bool? IsMenu { get; set; }
        public int? SecurityKeyParentId { get; set; }
        public int? SecuritySettingId { get; set; }
        public string? SecuritySettingName { get; set; }
    }
}
