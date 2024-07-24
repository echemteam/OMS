using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class CustomerAccountingSettingsRepository : BaseRepository<CustomerAccountingsettings>, ICustomerAccountingSettingsRepository
    {
        #region SP
        const string GETDETAILSBYCUSTOMERID = "GetDetailsByCustomerId";
        const string ADDEDITCUSTOMERSETTINGS = "AddEditCustomerSettings";
        const string ADDCUSTOMERSHPPINGDELIVERYCARRIERSANDDELIVERYMETHODS = "AddCustomerShppingDeliveryCarriersAndDeliveryMethods";
        const string UPDATESHPPINGDELIVERYCARRIERS = "UpdateShppingDeliveryCarriers";
        const string GETSHPPINGDELIVERYCARRIERANDDELIVERYMETHODSBYID = "GetShppingDeliveryCarrierAndDeliveryMethodsById";
        const string GETSHPPINGDELIVERYCARRIERSBYCUSTOMERID = "GetShppingDeliveryCarriersByCustomerId";
        const string GETDELIVERYMETHODSCUSTOMERID = "GetDeliveryMethodsCustomerId";
        const string UPDATEDELIVERYMETHODS = "UpdateDeliveryMethods";
        const string DELETECUSTOMERDELIVERYCARRIERSBYID = "DeleteCustomerDeliveryCarriersById";
        const string DELETECUSTOMERDELIVERYMETHODSBYID = "DeleteCustomerDeliveryMethodsById";
        const string ADDSHPPINGDELIVERYCARRIERS = "AddShppingDeliveryCarriers";
        const string ADDDELIVERYMETHODS = "AddDeliveryMethods";
        const string GETCUSTOMERDELIVERYCARRIERSBYCUSTOMERDELIVERYCARRIERID = "GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId";
        const string GETCUSTOMERDELIVERYMETHODBYCUSTOMERDELIVERYMETHODID = "GetCustomerDeliveryMethodByCustomerDeliveryMethodId";
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
        public async Task<AddEntityDTO<int>> AddEditCustomerSettings(CustomerAccountingSettingsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITCUSTOMERSETTINGS, new
            {
                requestData.CustomerAccountingSettingId,
                requestData.CustomerId,
                requestData.PaymentTermId,
                requestData.PaymentMethodId,
                requestData.CreditLimit,
                requestData.BillingCurrency,
                requestData.InvoiceSubmissionInstruction,
                requestData.CreatedBy,
                requestData.ExemptSalesTax,
                requestData.SalesTax,
                requestData.CardProcessingCharges,
                requestData.BankWireFee
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(CustomerShppingDeliveryCarriersDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCUSTOMERSHPPINGDELIVERYCARRIERSANDDELIVERYMETHODS, new
            {
                requestData.DeliveryAccountId,
                requestData.CustomerId,
                requestData.IsByDefault,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATESHPPINGDELIVERYCARRIERS, new
            {
                requestData.CustomerId,
                requestData.CustomerDeliveryCarrierId,
                requestData.CarrierId,
                requestData.AccountNumber,
                requestData.IsPrimary,
                requestData.UpdatedBy,
                requestData.HandlingFee
            }, CommandType.StoredProcedure);
        }

        public async Task<GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse> GetShppingDeliveryCarrierAndDeliveryMethodsById(int customerId)
        {
            GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse shppingDetails = await _context.GetFrist<GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse>(GETSHPPINGDELIVERYCARRIERANDDELIVERYMETHODSBYID, new
            {
                customerId
            }, CommandType.StoredProcedure);
            return shppingDetails;
        }
        public async Task<List<GetShppingDeliveryCarriersByCustomerIdResponse>> GetShppingDeliveryCarriersByCustomerId(int customerId)
        {
            List<GetShppingDeliveryCarriersByCustomerIdResponse> getShppingDeliveryCarriersList = await _context.GetList<GetShppingDeliveryCarriersByCustomerIdResponse>(GETSHPPINGDELIVERYCARRIERSBYCUSTOMERID, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getShppingDeliveryCarriersList;
        }

        public async Task<List<GetDeliveryMethodsCustomerIdResponse>> GetDeliveryMethodsCustomerId(int customerId)
        {
            List<GetDeliveryMethodsCustomerIdResponse> getDeliveryMethodsList = await _context.GetList<GetDeliveryMethodsCustomerIdResponse>(GETDELIVERYMETHODSCUSTOMERID, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getDeliveryMethodsList;
        }

        public async Task<AddEntityDTO<int>> UpdateDeliveryMethods(CustomerDeliveryMethodsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATEDELIVERYMETHODS, new
            {
                requestData.CustomerId,
                requestData.CustomerDeliveryMethodId,
                requestData.DeliveryMethodId,
                requestData.Charge,
                requestData.IsPrimary,
                requestData.UpdatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETECUSTOMERDELIVERYCARRIERSBYID, new
            {
                customerDeliveryCarrierId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(DELETECUSTOMERDELIVERYMETHODSBYID, new
            {
                customerDeliveryMethodId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> AddShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDSHPPINGDELIVERYCARRIERS, new
            {
                requestData.CustomerId,
                requestData.CarrierId,
                requestData.AccountNumber,
                requestData.IsPrimary,
                requestData.CreatedBy,
                requestData.HandlingFee
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> AddDeliveryMethods(CustomerDeliveryMethodsDTO requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDDELIVERYMETHODS, new
            {
                requestData.CustomerId,
                requestData.DeliveryMethodId,
                requestData.Charge,
                requestData.IsPrimary,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<GetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse> GetCustomerDeliveryCarriersByCustomerDeliveryCarrierId(int customerDeliveryCarrierId)
        {
            GetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse getCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse = await _context.GetFrist<GetCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse>(GETCUSTOMERDELIVERYCARRIERSBYCUSTOMERDELIVERYCARRIERID, new
            {
                customerDeliveryCarrierId
            }, commandType: CommandType.StoredProcedure);
            return getCustomerDeliveryCarriersByCustomerDeliveryCarrierIdResponse;
        }

        public async Task<GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse> GetCustomerDeliveryMethodByCustomerDeliveryMethodId(int customerDeliveryMethodId)
        {
            GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse getCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse = await _context.GetFrist<GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse>(GETCUSTOMERDELIVERYMETHODBYCUSTOMERDELIVERYMETHODID, new
            {
                customerDeliveryMethodId
            }, commandType: CommandType.StoredProcedure);
            return getCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse;
        }

        #endregion
    }
}
