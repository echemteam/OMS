﻿using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierAccoutingSetting;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SupplierFinancialSettingsRepository : BaseRepository<SupplierAccoutingSetting>, ISupplierFinancialSettingsRepository
    {
        #region SP Name
        const string ADDEDITSUPPLIERFINANCIALSETTINGS = "AddEditSupplierFinancialSettings";
        #endregion

        public SupplierFinancialSettingsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Supplier Accouting Setting Repository
        public async Task<AddEntityDTO<int>> AddEditSupplierFinancialSettings(SupplierAccoutingSettingDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITSUPPLIERFINANCIALSETTINGS, new
            {
                requestData.SupplierAccountingSettingId,
                requestData.PaymentTermId,
                requestData.SupplierId,
                requestData.InvoiceSubmissionMethod,
                requestData.PoDeliveryMethodId,
                requestData.IsActive,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
