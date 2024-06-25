
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Approval
{
    public class GetUserCheckListByEventIdResponse
    {
        public int ChecklistId {  get; set; }
        public string? ChecklistName {  get; set; }
        public List<GetCheckListItemResponse>? CheckListItem { get; set; }
    }
}
