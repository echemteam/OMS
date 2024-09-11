namespace OMS.Domain.Entities.API.Request.ApprovalConfiguration
{
    public class AddEditApprovalConfigurationRequest
    {
        public int ApprovalConfigurationId { get; set; }
        public string? RuleName { get; set; }
        public int? ModuleId { get; set; }
        public int? FunctionalityId { get; set; }
        public int? FunctionalityEventId { get; set; }
        public int? FunctionalitiesFieldId { get; set; }
        public byte? ApproverRoleId { get; set; }
        public string? Template {  get; set; }
    }
}
