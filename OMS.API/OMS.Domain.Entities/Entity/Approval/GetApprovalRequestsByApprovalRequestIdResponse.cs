namespace OMS.Domain.Entities.Entity.Approval
{
    public class GetApprovalRequestsByApprovalRequestIdResponse
    {
        public int? ApprovalRequestId { get; set; }
        public int? ModuleId { get; set; }
        public string? ModuleName { get; set; }
        public int? FunctionalityId { get; set; }
        public string? FunctionalityName { get; set; }
        public int? TableId { get; set; }
        public string? TableName { get; set; }
        public int? FunctionalitiesFieldId { get; set; }
        public string? FieldName { get; set; }
        public int? FunctionalityEventId { get; set; }
        public string? EventName { get; set; }
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
        public short? RequestedByUserId { get; set; }
        public string? RequestedByUserName { get; set; }
        public DateTime? RequestedDate { get; set; }
        public short? ApprovedByUserId { get; set; }
        public string? ApprovedByUserName { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string? Status { get; set; }
        public string? RejectReason { get; set; }
    }
}
