using OMS.Domain.Entities.API.Request.Appproval;
using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Application.Services.Approval
{
    public interface IApprovalService
    {
        Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId);
        Task<AddEntityDTO<int>> AddUserCheckList(AddUserCheckListRequest requestData,int CurrentUserId);
    }
}
