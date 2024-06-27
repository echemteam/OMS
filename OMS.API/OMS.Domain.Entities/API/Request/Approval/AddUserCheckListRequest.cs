namespace OMS.Domain.Entities.API.Request.Appproval
{
    public class AddUserChecklistRequest
    {
        public List<UserChecklistRequest> CheckListRequest { get; set; }

    }
    public class UserChecklistRequest
    {
        public bool? IsApproved { get; set; }
        public int? ChecklistItemId { get; set; }
    }
}
