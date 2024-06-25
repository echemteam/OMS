using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Implementation
{
    internal class ApprovalRepository : BaseRepository<Approval>, IApprovalRepository
    {
        #region SP
        const string GETUSERCHECKLISTBYEVENTBYID = "GetUserCheckListByEventId";
        const string GETCHECKLISTITEMBYLISTID = "GetCheckListItemByListId";
        const string ADDUSERCHECKLISTRESPONSE = "AddUserCheckListResponse";
        #endregion

        public ApprovalRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<List<GetUserCheckListByEventIdResponse>> GetUserCheckList(int eventId)
        {
            List<GetUserCheckListByEventIdResponse> response = await _context.GetList<GetUserCheckListByEventIdResponse>(GETUSERCHECKLISTBYEVENTBYID, new
            {
                eventId
            }, commandType: CommandType.StoredProcedure);
            return response;

        }
        public async Task<List<GetCheckListItemResponse>> GetCheckListItemByListId(int ChecklistId)
        {
            List<GetCheckListItemResponse> getEmailByContactIdResponse = await _context.GetList<GetCheckListItemResponse>(GETCHECKLISTITEMBYLISTID, new
            {
                ChecklistId
            }, commandType: CommandType.StoredProcedure);
            return getEmailByContactIdResponse;

        }
        public async Task<AddEntityDTO<int>> AddUserCheckList(UserCheckListDTO addUserCheckList)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDUSERCHECKLISTRESPONSE, new
            {
                addUserCheckList.UserId,
                addUserCheckList.IsApproved,
                addUserCheckList.ChecklistItemId,
            }, CommandType.StoredProcedure);
        }
    }
}
