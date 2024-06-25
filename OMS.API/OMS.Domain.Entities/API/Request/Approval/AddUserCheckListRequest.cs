using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Appproval
{
    public class AddUserCheckListRequest
    {
        public bool? IsApproved {  get; set; }
        public int? ChecklistItemId {  get; set; }

    }
}
