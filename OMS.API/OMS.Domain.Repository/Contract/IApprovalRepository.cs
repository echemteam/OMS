using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Contract
{
    public interface IApprovalRepository
    {
         Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId);
         Task<List<GetCheckListItemResponse>> GetCheckListItemByListId(int ChecklistId);
         Task<AddEntityDTO<int>> AddUserChecklistResponse(DataTable CheckListDataTable);
         Task<List<GetValidateCheckListResponse>> GetValidateCustomer(int mainId,bool? IsSubCustomer);
         Task<List<GetValidateCheckListResponse>> GetValidateSupplier(int mainId);
    }
}
