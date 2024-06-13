using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;
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
    internal class CustomerAccountingSettingsRepository : BaseRepository<CustomerAccountingsettings>, ICustomerAccountingSettingsRepository
    {
        #region SP
        const string GETDETAILSBYCUSTOMERID = "GetDetailsByCustomerId";
        const string ADDEDITCUSTOMERSETTINGS = "AddEditCustomerSettings";
        #endregion

        public CustomerAccountingSettingsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Repository
        public async Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId)
        {
            GetDetailsByCustomerIdResponse customerDetails = await _context.GetFrist<GetDetailsByCustomerIdResponse>(GETDETAILSBYCUSTOMERID, new
            {
                customerId
            }, CommandType.StoredProcedure);
            return customerDetails;
        }
        public async Task<AddEntityDTO<int>> AddEditCustomerSettings(CustomerAccountingSettingsDTO settings)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITCUSTOMERSETTINGS, new
            {
                 settings.CustomerAccountingSettingId,
                 settings.CustomerId,
                 settings.PaymentTermId,
                 settings.PaymentMethodId,
                 settings.CreditLimit,
                 settings.BillingCurrency,
                 settings.InvoiceSubmissionInstruction,
                 settings.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
