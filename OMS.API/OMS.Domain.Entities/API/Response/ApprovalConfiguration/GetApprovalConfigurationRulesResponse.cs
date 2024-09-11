namespace OMS.Domain.Entities.API.Response.ApprovalConfiguration
{
    public class GetApprovalConfigurationRulesResponse
    {
        public int? ApprovalConfigurationId { get; set; }
        public string? RuleName { get; set; }
        public int? ModuleId { get; set; }
        public string? ModuleName { get; set; }
        public int? FunctionalityId { get; set; }
        public string? FunctionalityName { get; set; }
        public int? FunctionalitiesFieldId { get; set; }
        public string? FieldName { get; set; }
        public byte? ApproverRoleId { get; set; }
        public string? RoleName { get; set; }
        public bool? IsFunctional { get; set; }
    }
}
