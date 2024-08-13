namespace OMS.Domain.Entities.API.Request.Approval
{
    public class UpdateApprovalRequestsStatusRequest
    {
        public int ApprovalRequestId { get; set; }
        public string? Status { get; set; }

    }
}
