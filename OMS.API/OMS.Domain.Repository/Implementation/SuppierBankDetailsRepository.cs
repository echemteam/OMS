using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SuppierBankDetails;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SuppierBankDetailsRepository : BaseRepository<SuppierBankDetails>, ISuppierBankDetailsRepository
    {
        #region SP Name
        const string ADDEDITACHWIRE = "AddEditACHWire";
        #endregion

        public SuppierBankDetailsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Supplier Accouting Setting Repository
        public async Task<AddEntityDto<int>> AddEditACHWire(SuppierBankDetailsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITACHWIRE, new
            {
                requestData.SupplierBankDetailsId,
                requestData.BankAddressId,
                requestData.RecipientAddressId,
                requestData.MessageToRecipient,
                requestData.SupplierId,
                requestData.IsAddressInUs,
                requestData.RecipientPhoneNumber,
                requestData.PaymentTermId,
                requestData.MessageToRecipientBank,
                requestData.BeneficiaryName,
                requestData.BankName,
                requestData.AccountType,
                requestData.AccountNumber,
                requestData.BranchCode,
                requestData.IbanNumber,
                requestData.SwiftCode,
                requestData.RoutingNumber,
                requestData.SortCode,
                requestData.BsbNumber,
                requestData.IsActive,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
