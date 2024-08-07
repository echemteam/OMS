namespace OMS.Domain.Entities.API.Request.Approval
{
    public class AddApprovalRequests
    {
        public int? ModuleId { get; set; }
        public int? FunctionalityId { get; set; }
        public int? TableId { get; set; }
        public int? FunctionalitiesFieldId { get; set; }
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
    }
}
