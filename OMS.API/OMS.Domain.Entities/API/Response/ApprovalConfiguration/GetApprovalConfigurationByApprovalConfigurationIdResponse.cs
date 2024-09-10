namespace OMS.Domain.Entities.API.Response.ApprovalConfiguration
{
    public class GetApprovalConfigurationByApprovalConfigurationIdResponse
    {
        public int ApprovalConfigurationId { get; set; }
        public string? RuleName { get; set; }
        public int? ModuleId { get; set; }
        public string? ModuleName { get; set; }
        public int? FunctionalityId { get; set; }
        public string? Name { get; set; }
        public int? FunctionalitiesFieldId { get; set; }
        public string? FieldName { get; set; }
        public int? FunctionalityEventId { get; set; }
        public string? EventName { get; set; }
        public byte? ApproverRoleId { get; set; }
        public string? RoleName { get; set; }
        public string? Template { get; set; }
    }
}
