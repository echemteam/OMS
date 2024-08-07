namespace OMS.Domain.Entities.Entity.Approval
{
    public class GetApprovalRequestsListByStatusAndRequestedByUserIdResponse
    {
        public int? ApprovalRequestId { get; set; }
        public int? FunctionalityId { get; set; }
        public string? FunctionalityName { get; set; }
        public int? ModuleId { get; set; }
        public string? ModuleName { get; set; }
    }
}
