using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationRepository : BaseRepository<OrganizationProfile>, IOrganizationRepository
    {
        #region SP Name
        const string ADDEDITORGANIZATIONPROFILE = "AddEditOrganizationProfile";
        const string GETORGANIZATIONPROFILE = "GetOrganizationProfile";
        #endregion

        public OrganizationRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Organization Repository
        public async Task<AddEntityDTO<int>> AddEditOrganizationProfile(OrganizationProfileDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITORGANIZATIONPROFILE, new
            {
                requestData.OrganizationId,
                requestData.Name,
                requestData.Logo,
                requestData.AddressLine1,
                requestData.AddressLine2,
                requestData.CityId,
                requestData.StateId,
                requestData.CountryId,
                requestData.ZipCode,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationProfileResponse> GetOrganizationProfile()
        {
            GetOrganizationProfileResponse organizationProfileDetails = await _context.GetFrist<GetOrganizationProfileResponse>(GETORGANIZATIONPROFILE, CommandType.StoredProcedure);
            return organizationProfileDetails;
        }
        #endregion
    }
}
