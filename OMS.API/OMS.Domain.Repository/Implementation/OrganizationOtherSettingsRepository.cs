using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationOtherSettingsRepository : BaseRepository<OrganizationOtherSettings>, IOrganizationOtherSettingsRepository
    {
        #region SP Name
        const string ADDEDITORGANIZATIONOTHERSETTINGS = "AddEditOrganizationOtherSettings";
        const string GETORGANIZATIONOTHERSETTINGS = "GetOrganizationOtherSettings";
        #endregion

        public OrganizationOtherSettingsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Organization Other Settings Repository
        public async Task<AddEntityDTO<int>> AddEditOrganizationOtherSettings(OrganizationOtherSettingsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITORGANIZATIONOTHERSETTINGS, new
            {
                requestData.OrganizationOtherSettingId,
                requestData.OrganizationId,
                requestData.DefaultPaymentTerms,
                requestData.FedexAccountDetail,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationOtherSettingsResponse> GetOrganizationOtherSettings()
        {
            GetOrganizationOtherSettingsResponse organizationProfileDetails = await _context.GetFrist<GetOrganizationOtherSettingsResponse>(GETORGANIZATIONOTHERSETTINGS, CommandType.StoredProcedure);
            return organizationProfileDetails;
        }
        #endregion
    }
}
