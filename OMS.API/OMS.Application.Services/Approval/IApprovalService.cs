using OMS.Domain.Entities.API.Response.Approval;
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
    }
}
