﻿using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class CustomersRepository : BaseRepository<Customers>, ICustomersRepository
    {
        #region SP Name
        const string ADDCUSTOMERSBASICINFORMATION = "AddCustomersBasicInformation";
        const string UPDATECUSTOMERSBASICINFORMATION = "UpdateCustomersBasicInformation";
        const string GETCUSTOMERSBASICINFORMATIONBYID = "GetCustomersBasicInformationById";
        const string GETCUSTOMERS = "GetCustomers";
        const string CHECKCUSTOMERNAMEEXIST = "CheckCustomerNameExist";
        const string UPDATECUSTOMERAPPROVESTATUS = "UpdateCustomerApproveStatus";
        const string UPDATECUSTOMERINACTIVESTATUS = "UpdateCustomerInActiveStatus";
        const string UPDATECUSTOMERSTATUS = "UpdateCustomerStatus";
        const string ADDADDRESSFORCUSTOMER = "AddAddressForCustomer";
        const string UPDATEADDRESSFORCUSTOMER = "UpdateAddressForCustomer";
        const string GETCUSTOMERAUDITHISTORY = "GetCustomerAuditHistory";
        #endregion

        public CustomersRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Customers Repository
        public async Task<AddEntityDTO<int>> AddCustomersBasicInformation(CustomersDTO customers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCUSTOMERSBASICINFORMATION, new
            {
                customers.Name,
                customers.GroupTypeId,
                customers.TerritoryId,
                customers.CountryId,
                customers.EmailAddress,
                customers.Website,
                customers.Note,
                customers.IsCompany,
                customers.TaxId,
                customers.CreatedBy,
                customers.IsBuyingForThirdParty,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(CustomersDTO customers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATECUSTOMERSBASICINFORMATION, new
            {
                customers.CustomerId,
                customers.Name,
                customers.GroupTypeId,
                customers.TerritoryId,
                customers.CountryId,
                customers.EmailAddress,
                customers.Website,
                customers.Note,
                customers.IsCompany,
                customers.TaxId,
                customers.UpdatedBy,
                customers.IsBuyingForThirdParty,
            }, CommandType.StoredProcedure);
        }

        public async Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int customerId)
        {
            GetCustomersBasicInformationByIdResponse customerDetails = await _context.GetFrist<GetCustomersBasicInformationByIdResponse>(GETCUSTOMERSBASICINFORMATIONBYID, new
            {
                customerId
            }, CommandType.StoredProcedure);
            return customerDetails;
        }

        public async Task<EntityList<GetCustomersResponse>> GetCustomers(GetCustomersRequest queryRequest)
        {
            return await _context.GetListSP<GetCustomersResponse>(GETCUSTOMERS, new
            {
                queryRequest.StatusId,
                queryRequest.Pagination!.PageNumber,
                queryRequest.Pagination.PageSize,
                queryRequest.Filters?.SearchText
            }, true);
        }

        public async Task<AddEntityDTO<int>> CheckCustomerNameExist(CustomersDTO customers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(CHECKCUSTOMERNAMEEXIST, new
            {
                customers.Name,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomerApproveStatus(CustomersDTO customers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATECUSTOMERAPPROVESTATUS, new
            {
                customers.CustomerId,
                customers.ApprovedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> UpdateCustomerInActiveStatus(CustomersDTO customers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATECUSTOMERINACTIVESTATUS, new
            {
                customers.CustomerId,
                customers.StatusId,
                customers.InActiveReason,
                customers.UpdatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomerStatus(CustomersDTO customers)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATECUSTOMERSTATUS, new
            {
                customers.CustomerId,
                customers.StatusId,
                customers.UpdatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> AddAddressForCustomer(AddAddressForCustomerRequest requestData, short createdBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDADDRESSFORCUSTOMER, new
            {
                requestData.CustomerId,
                requestData.AddressId,
                requestData.AddressTypeId,
                requestData.IsPreferredBilling,
                requestData.IsPreferredShipping,
                createdBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> UpdateAddressForCustomer(UpdateAddressForCustomerRequest requestData, short updatedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATEADDRESSFORCUSTOMER, new
            {
                requestData.CustomerAddressId,
                requestData.CustomerId,
                requestData.AddressId,
                requestData.AddressTypeId,
                requestData.IsPreferredBilling,
                requestData.IsPreferredShipping,
                updatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<List<GetCustomerAuditHistoryResponse>> GetCustomerAuditHistory()
        {
            return await _context.GetList<GetCustomerAuditHistoryResponse>(GETCUSTOMERAUDITHISTORY, commandType: CommandType.StoredProcedure);
        }
        #endregion
    }
}
