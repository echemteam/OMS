using OMS.Domain.Entities.API.Request.Organization;
using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationRepository : BaseRepository<OrganizationProfile>, IOrganizationRepository
    {
        #region SP Name
        const string ADDEDITORGANIZATIONPROFILE = "AddEditOrganizationProfile";
        const string GETORGANIZATIONPROFILE = "GetOrganizationProfile";
        const string GETORGANIZATIONHISTORYS = "GetOrganizationHistorys";
        #endregion

        public OrganizationRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Organization Repository
        public async Task<AddEntityDto<int>> AddEditOrganizationProfile(OrganizationProfileDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITORGANIZATIONPROFILE, new
            {
                requestData.OrganizationProfileId,
                requestData.RegisteredName,
                requestData.DBAName,
                requestData.DateIncorporated,
                requestData.NAICSCode,
                requestData.EIN,
                requestData.TXTaxpayerNumber,
                requestData.SOSFileNumber,
                requestData.WebFileNumber,
                requestData.TWCTaxAccountNumber,
                requestData.AttachmentName,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationProfileResponse> GetOrganizationProfile()
        {
            GetOrganizationProfileResponse organizationProfileDetails = await _context.GetFrist<GetOrganizationProfileResponse>(GETORGANIZATIONPROFILE, CommandType.StoredProcedure);
            return organizationProfileDetails;
        }
        public async Task<EntityList<GetOrganizationHistorysResponse>> GetOrganizationHistorys(GetOrganizationHistoryRequest requestData)
        {
            return await _context.GetListSP<GetOrganizationHistorysResponse>(GETORGANIZATIONHISTORYS, new
            {
                requestData.Pagination?.PageNumber,
                requestData.Pagination?.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString,
                requestData.ToDate,
                requestData.FromDate,
            }, true);
        }
        #endregion
    }
}
