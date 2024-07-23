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
        public async Task<AddEntityDTO<int>> AddEditCustomerSettings(CustomerAccountingSettingsDTO addEditSettings)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITCUSTOMERSETTINGS, new
            {
                addEditSettings.CustomerAccountingSettingId,
                addEditSettings.CustomerId,
                addEditSettings.PaymentTermId,
                addEditSettings.PaymentMethodId,
                addEditSettings.CreditLimit,
                addEditSettings.BillingCurrency,
                addEditSettings.InvoiceSubmissionInstruction,
                addEditSettings.CreatedBy,
                addEditSettings.ExemptSalesTax,
                addEditSettings.SalesTax,
                addEditSettings.CardProcessingCharges,
                addEditSettings.BankWireFee
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(CustomerShppingDeliveryCarriersDTO addShppingMethods)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCUSTOMERSHPPINGDELIVERYCARRIERSANDDELIVERYMETHODS, new
            {
                addShppingMethods.DeliveryAccountId,
                addShppingMethods.CustomerId,
                addShppingMethods.IsByDefault,
                addShppingMethods.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDTO updateCarriers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATESHPPINGDELIVERYCARRIERS, new
            {
                updateCarriers.CustomerId,
                updateCarriers.CustomerDeliveryCarrierId,
                updateCarriers.CarrierId,
                updateCarriers.AccountNumber,
                updateCarriers.IsPrimary,
                updateCarriers.UpdatedBy,
                updateCarriers.HandlingFee
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

        public async Task<AddEntityDTO<int>> UpdateDeliveryMethods(CustomerDeliveryMethodsDTO updateDeliveryMethods)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATEDELIVERYMETHODS, new
            {
                updateDeliveryMethods.CustomerId,
                updateDeliveryMethods.CustomerDeliveryMethodId,
                updateDeliveryMethods.DeliveryMethodId,
                updateDeliveryMethods.Charge,
                updateDeliveryMethods.IsPrimary,
                updateDeliveryMethods.UpdatedBy
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

        public async Task<AddEntityDTO<int>> AddShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDTO carriers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDSHPPINGDELIVERYCARRIERS, new
            {
                carriers.CustomerId,
                carriers.CarrierId,
                carriers.AccountNumber,
                carriers.IsPrimary,
                carriers.CreatedBy,
                carriers.HandlingFee
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> AddDeliveryMethods(CustomerDeliveryMethodsDTO deliveryMethods)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDDELIVERYMETHODS, new
            {
                deliveryMethods.CustomerId,
                deliveryMethods.DeliveryMethodId,
                deliveryMethods.Charge,
                deliveryMethods.IsPrimary,
                deliveryMethods.CreatedBy,
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
