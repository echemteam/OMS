using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Application.Services.Approval
{
    public class ApprovalService : BaseServices, IApprovalService
    {
        public readonly ICommonSettingService _commonSettingService;
        public ApprovalService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        public async Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId)
        {
            List<GetUserCheckListByEventIdResponse> checkList = await repositoryManager.approval.GetUserCheckList(eventId);
            if (checkList != null && checkList.Count > 0)
            {
                foreach (var checkListItem in checkList)
                {
                    checkListItem.CheckListItem = await repositoryManager.approval.GetCheckListItemByListId(checkListItem.ChecklistId);
                }
            }
            return checkList;
        }

    }
}
