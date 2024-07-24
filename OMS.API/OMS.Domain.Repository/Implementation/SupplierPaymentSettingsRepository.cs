using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierPaymentSettings;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SupplierPaymentSettingsRepository : BaseRepository<SupplierPaymentSettings>, ISupplierPaymentSettingsRepository
    {
        #region SP Name
        const string ADDEDITCREDITCARD = "AddEditCreditCard";
        const string ADDEDITCHECK = "AddEditCheck";
        const string ADDEDITOTHER = "AddEditOther";
        #endregion

        public SupplierPaymentSettingsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Supplier Accouting Setting Repository
        public async Task<AddEntityDTO<int>> AddEditCreditCard(SupplierPaymentSettingsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITCREDITCARD, new
            {
                requestData.SupplierPaymentSettingId,
                requestData.SupplierId,
                requestData.CCNote,
                requestData.IsCCExistsOnFile,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> AddEditCheck(SupplierPaymentSettingsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITCHECK, new
            {
                requestData.SupplierPaymentSettingId,
                requestData.SupplierId,
                requestData.CheckMailingAddressId,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> AddEditOther(SupplierPaymentSettingsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITOTHER, new
            {
                requestData.SupplierPaymentSettingId,
                requestData.SupplierId,
                requestData.OtherNote,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
