using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.API.Response.Contact;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Contract
{
    public interface IApprovalRepository
    {
         Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId);
         Task<List<GetCheckListItemResponse>> GetCheckListItemByListId(int ChecklistId);
    }
}
