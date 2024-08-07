using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.API.Response.SuppierBankDetails;
using OMS.Domain.Entities.API.Response.supplierPaymentSettings;
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
        const string GETACHWIREBYSUPPLIERID = "GetACHWireBySupplierId";
        const string GETPAYMENTSETTINGSBYSUPPLIERID = "GetPaymentSettingsBySupplierId";
        const string GETADDRESSBYADDRESSID = "GetAddressByAddressId";
        #endregion

        public SupplierPaymentSettingsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Supplier Accouting Setting Repository
        public async Task<AddEntityDto<int>> AddEditCreditCard(SupplierPaymentSettingsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITCREDITCARD, new
            {
                requestData.SupplierPaymentSettingId,
                requestData.SupplierId,
                requestData.CCNote,
                requestData.IsCCExistsOnFile,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> AddEditCheck(SupplierPaymentSettingsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITCHECK, new
            {
                requestData.SupplierPaymentSettingId,
                requestData.SupplierId,
                requestData.CheckMailingAddressId,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> AddEditOther(SupplierPaymentSettingsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITOTHER, new
            {
                requestData.SupplierPaymentSettingId,
                requestData.SupplierId,
                requestData.OtherNote,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<GetACHWireBySupplierIdResponse> GetACHWireBySupplierId(int supplierId)
        {
            GetACHWireBySupplierIdResponse getAddEditACHWireBySupplierIdResponse = await _context.GetFrist<GetACHWireBySupplierIdResponse>(GETACHWIREBYSUPPLIERID, new
            {
                supplierId
            }, commandType: CommandType.StoredProcedure);
            return getAddEditACHWireBySupplierIdResponse;
        }
        public async Task<GetAddressResponse> GetAddressByAddressId(int? addressId)
        {
            GetAddressResponse getAddressResponse = await _context.GetFrist<GetAddressResponse>(GETADDRESSBYADDRESSID, new
            {
                addressId
            }, commandType: CommandType.StoredProcedure);
            return getAddressResponse;
        }
        public async Task<GetPaymentSettingsBySupplierIdResponse> GetPaymentSettingsBySupplierId(int supplierId)
        {
            GetPaymentSettingsBySupplierIdResponse getCreditCardBySupplierIdResponse = await _context.GetFrist<GetPaymentSettingsBySupplierIdResponse>(GETPAYMENTSETTINGSBYSUPPLIERID, new
            {
                supplierId
            }, commandType: CommandType.StoredProcedure);
            return getCreditCardBySupplierIdResponse;
        }
        #endregion
    }
}
