namespace OMS.Domain.Entities.Entity.Approval
{
    public class UserCheckListDto
    {
        public List<UserChecklistRequest>? CheckListRequest { get; set; }
    }
    public class UserChecklistRequest
    {
        public int? UserId { get; set; }
        public bool? IsApproved { get; set; }
        public int? ChecklistItemId { get; set; }
    }
}
