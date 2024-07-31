using OMS.Domain.Entities.API.Request.Functionalities;
using OMS.Domain.Entities.API.Response.Functionalities;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Functionalities;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class FunctionalitiesRepository : BaseRepository<ApprovalConfiguration>, IFunctionalitiesRepository
    {
        #region SP Name
        const string ADDFUNCTIONALITIESRESPONSIBLESUSER = "AddFunctionalitiesResponsiblesUser";
        const string DELETEFUNCTIONALITIESRESPONSIBLESUSER = "DeleteFunctionalitiesResponsiblesUser";
        const string GETFUNCTIONALITIESRESPONSIBLES = "GetFunctionalitiesResponsibles";
        #endregion

        public FunctionalitiesRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Functionalities Repository
        public async Task<AddEntityDTO<int>> AddFunctionalitiesResponsiblesUser(FunctionalitiesResponsiblesDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDFUNCTIONALITIESRESPONSIBLESUSER, new
            {
                requestData.FunctionalityId,
                requestData.ResponsibleUserId,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> DeleteFunctionalitiesResponsiblesUser(int functionalitiesResponsiblesId)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETEFUNCTIONALITIESRESPONSIBLESUSER, new
            {
                functionalitiesResponsiblesId
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetFunctionalitiesResponsiblesResponse>> GetFunctionalitiesResponsibles(GetFunctionalitiesResponsiblesRequest requestData)
        {
            return await _context.GetListSP<GetFunctionalitiesResponsiblesResponse>(GETFUNCTIONALITIESRESPONSIBLES, new
            {
                requestData.FunctionalityId,
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString,
            }, true);
        }
        #endregion
    }
}
