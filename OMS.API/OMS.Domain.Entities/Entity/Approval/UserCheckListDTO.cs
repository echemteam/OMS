namespace OMS.Domain.Entities.Entity.Approval
{
    public class UserCheckListDTO
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
