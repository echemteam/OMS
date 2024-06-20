﻿using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
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
        const string ADDCUSTOMERSHPPINGDELIVERYCARRIERS = "AddCustomerShppingDeliveryCarriers";
        const string UPDATESHPPINGDELIVERYCARRIERS = "UpdateShppingDeliveryCarriers";
        const string GETSHPPINGDELIVERYCARRIERSBYCUSTOMERID = "GetShppingDeliveryCarriersByCustomerId";
        const string GETDELIVERYMETHODSCUSTOMERID = "GetDeliveryMethodsCustomerId";
        const string UPDATEDELIVERYMETHODS = "UpdateDeliveryMethods";
        const string DELETECUSTOMERDELIVERYCARRIERSBYID = "DeleteCustomerDeliveryCarriersById";
        const string DELETECUSTOMERDELIVERYMETHODSBYID = "DeleteCustomerDeliveryMethodsById";
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

        public async Task<AddEntityDTO<int>> AddCustomerShppingDeliveryCarriersAndDeliveryMethods(CustomerShppingDeliveryCarriersDTO Carriers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCUSTOMERSHPPINGDELIVERYCARRIERS, new
            {
                Carriers.DeliveryAccountId,
                Carriers.CustomerId,
                Carriers.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateShppingDeliveryCarriers(CustomerShppingDeliveryCarriersDTO updateCarriers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATESHPPINGDELIVERYCARRIERS, new
            {
                updateCarriers.CustomerId,
                updateCarriers.CustomerDeliveryCarrierId,
                updateCarriers.AccountNumber,
                updateCarriers.IsPrimary,
                updateCarriers.UpdatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetShppingDeliveryCarriersByCustomerIdResponse>> GetShppingDeliveryCarriersByCustomerId(int customerid)
        {
            List<GetShppingDeliveryCarriersByCustomerIdResponse> getShppingDeliveryCarriersList = await _context.GetList<GetShppingDeliveryCarriersByCustomerIdResponse>(GETSHPPINGDELIVERYCARRIERSBYCUSTOMERID, new
            {
                customerid
            }, commandType: CommandType.StoredProcedure);
            return getShppingDeliveryCarriersList;
        }

        public async Task<List<GetDeliveryMethodsCustomerIdResponse>> GetDeliveryMethodsCustomerId(int customerid)
        {
            List<GetDeliveryMethodsCustomerIdResponse> getDeliveryMethodsList = await _context.GetList<GetDeliveryMethodsCustomerIdResponse>(GETDELIVERYMETHODSCUSTOMERID, new
            {
                customerid
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
        #endregion
    }
}
