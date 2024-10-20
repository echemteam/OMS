﻿namespace OMS.Domain.Entities.Entity.Approval
{
    public class ApprovalRequestsDto
    {
        public int? ApprovalRequestId { get; set; }
        public int? ModuleId { get; set; }
        public int? FunctionalityId { get; set; }
        public int? TableId { get; set; }
        public int? FunctionalityEventId { get; set; }
        public int? FunctionalitiesFieldId { get; set; }
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
        public short? RequestedByUserId { get; set; }
        public DateTime? RequestedDate { get; set; }
        public short? ApprovedByUserId { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string? Status { get; set; }
        public string? RejectReason { get; set; }
        public string? OldValueTemplate { get; set; }
        public string? NewValueTemplate { get; set; }
        public bool IsFunctional  { get; set; }
    }                  
}
