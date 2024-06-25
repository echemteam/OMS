using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Approval
{
    public class GetCheckListItemResponse
    {
        public int? ChecklistItemId {  get; set; }
        public string? ItemDescription {  get; set; }
    }
}
