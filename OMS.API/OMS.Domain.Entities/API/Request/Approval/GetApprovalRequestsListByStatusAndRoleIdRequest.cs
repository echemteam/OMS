namespace OMS.Domain.Entities.API.Request.Approval
{
    public class GetApprovalRequestsListByStatusAndRoleIdRequest
    {
        public string? Status { get; set; }
        public byte? RoleId { get; set; }
        public string? EventIds { get; set; }
        public string? SortOrder { get; set; }
        public int? ModuleId { get; set; }
    }
}
