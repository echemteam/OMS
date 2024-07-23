using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SmtpSettingsRepository : BaseRepository<SmtpSettings>, ISmtpSettingsRepository
    {
        #region SP Name
        const string ADDEDITSMTPSETTINGS = "AddEditSmtpSettings";
        const string GETSMTPSETTINGS = "GetSmtpSettings";
        #endregion

        public SmtpSettingsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region SmtpSettings Repository
        public async Task<AddEntityDTO<int>> AddEditSmtpSettings(SmtpSettingsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITSMTPSETTINGS, new
            {
                requestData.SmtpSettingId,
                requestData.OrganizationId,
                requestData.EmailProvider,
                requestData.SmtpServer,
                requestData.SmtpPort,
                requestData.SmtpUserName,
                requestData.SmtpPassword,
                requestData.UseSsl,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetSmtpSettingsResponse> GetSmtpSettings()
        {
            GetSmtpSettingsResponse organizationProfileDetails = await _context.GetFrist<GetSmtpSettingsResponse>(GETSMTPSETTINGS, CommandType.StoredProcedure);
            return organizationProfileDetails;
        }
        #endregion
    }
}
