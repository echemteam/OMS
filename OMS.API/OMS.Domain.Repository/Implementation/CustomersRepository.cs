using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.API.Response.Supplier;
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
        const string ADDEDITCUSTOMERSBASICINFORMATION = "AddEditCustomersBasicInformation";
        const string UPDATECUSTOMERSBASICINFORMATION = "UpdateCustomersBasicInformation";
        const string GETCUSTOMERSBASICINFORMATIONBYID = "GetCustomersBasicInformationById";
        const string GETCUSTOMERS = "GetCustomers";
        const string CHECKCUSTOMERNAMEEXIST = "CheckCustomerNameExist";
        const string UPDATECUSTOMERAPPROVESTATUS = "UpdateCustomerApproveStatus";
        const string UPDATECUSTOMERINACTIVESTATUS = "UpdateCustomerInActiveStatus";
        const string UPDATECUSTOMERSTATUS = "UpdateCustomerStatus";
        const string ADDADDRESSFORCUSTOMER = "AddAddressForCustomer";
        const string UPDATEADDRESSFORCUSTOMER = "UpdateAddressForCustomer";
        const string GETCUSTOMERAUDITHISTORYBYCUSTOMERID = "GetCustomerAuditHistoryByCustomerId";
        const string ADDEDITCONTACTFORCUSTOMER = "AddEditContactForCustomer";
        const string GETCUSTOMERSDETAILSBYCUTOMERNAME = "GetCustomersDetailsByCutomerName";
        const string UPDATECUSTOMERSUBCUSTOMER = "UpdateCustomerSubCustomer";
        const string ADDSUBCUSTOMER = "AddSubCustomer";
        const string GETSUBCUSTOMERBYCUSTOMERID = "GetSubCustomerByCustomerId";
        const string DELETESUBCUSTOMER = "DeleteSubCustomer";
        #endregion

        public CustomersRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Customers Repository
        public async Task<AddEditResponse> AddEditCustomersBasicInformation(CustomersDto customers)
        {
            return await _context.GetSingleAsync<AddEditResponse>(ADDEDITCUSTOMERSBASICINFORMATION, new
            {
                customers.CustomerId,
                customers.Name,
                customers.GroupTypeId,
                customers.TerritoryId,
                customers.CountryId,
                customers.EmailAddress,
                customers.Website,
                customers.Note,
                customers.TaxId,
                customers.CreatedBy,
                customers.IsBuyingForThirdParty,
                customers.ResponsibleUserId,
                customers.IsSubCustomer
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> UpdateCustomersBasicInformation(CustomersDto customers)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATECUSTOMERSBASICINFORMATION, new
            {
                customers.CustomerId,
                customers.Name,
                customers.GroupTypeId,
                customers.TerritoryId,
                customers.CountryId,
                customers.EmailAddress,
                customers.Website,
                customers.TaxId,
                customers.UpdatedBy,
                customers.IsBuyingForThirdParty,
                customers.ResponsibleUserId,
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
                queryRequest.Filters?.SearchText,
                queryRequest.SortString
            }, true);
        }

        public async Task<AddEntityDto<int>> CheckCustomerNameExist(CustomersDto customers)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(CHECKCUSTOMERNAMEEXIST, new
            {
                customers.Name,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> UpdateCustomerApproveStatus(CustomersDto customers)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATECUSTOMERAPPROVESTATUS, new
            {
                customers.CustomerId,
                customers.ApprovedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> UpdateCustomerInActiveStatus(CustomersDto customers)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATECUSTOMERINACTIVESTATUS, new
            {
                customers.CustomerId,
                customers.StatusId,
                customers.InActiveReason,
                customers.UpdatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> UpdateCustomerStatus(CustomersDto customers)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATECUSTOMERSTATUS, new
            {
                customers.CustomerId,
                customers.StatusId,
                customers.UpdatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> AddAddressForCustomer(AddAddressForCustomerRequest requestData, short createdBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDADDRESSFORCUSTOMER, new
            {
                requestData.CustomerId,
                requestData.AddressId,
                requestData.AddressTypeId,
                requestData.IsPreferredBilling,
                requestData.IsPreferredShipping,
                createdBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> UpdateAddressForCustomer(UpdateAddressForCustomerRequest requestData, short updatedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATEADDRESSFORCUSTOMER, new
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

        public async Task<EntityList<GetCustomerAuditHistoryByCustomerIdResponse>> GetCustomerAuditHistoryByCustomerId(GetCustomerAuditHistoryByCustomerIdRequest queryRequest)
        {
            return await _context.GetListSP<GetCustomerAuditHistoryByCustomerIdResponse>(GETCUSTOMERAUDITHISTORYBYCUSTOMERID, new
            {
                queryRequest.CustomerId,
                queryRequest.Pagination!.PageNumber,
                queryRequest.Pagination.PageSize,
                queryRequest.EventName,
                queryRequest.UserId,
                queryRequest.ToDate,
                queryRequest.FromDate
            }, true);
        }

        public async Task<AddEntityDto<int>> AddEditContactForCustomer(AddEditContactForCustomerRequest requestData, short createdBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITCONTACTFORCUSTOMER, new
            {
                requestData.CustomerContactId,
                requestData.CustomerId,
                requestData.ContactId,
                requestData.ContactTypeId,
                requestData.IsPrimary,
                createdBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetCustomersDetailsByCutomerNameResponse>> GetCustomersDetailsByCutomerName(string customerName)
        {
            List<GetCustomersDetailsByCutomerNameResponse> customerDetails = await _context.GetList<GetCustomersDetailsByCutomerNameResponse>(GETCUSTOMERSDETAILSBYCUTOMERNAME, new
            {
                customerName
            }, CommandType.StoredProcedure);
            return customerDetails;
        }
        public async Task<AddEntityDto<bool>> UpdateCustomerSubCustomer(UpdateCustomerSubCustomerRequest requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<bool>>(UPDATECUSTOMERSUBCUSTOMER, new
            {
                requestData.CustomerId,
                requestData.IsSubCustomer
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> AddSubCustomer(AddSubCustomerRequest requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDSUBCUSTOMER, new
            {
                requestData.CustomerId,
                requestData.SubCustomerId
            }, CommandType.StoredProcedure);
        }
        public async Task<EntityList<GetSubCustomerByCustomerIdResponse>> GetSubCustomerByCustomerId(GetSubCustomerByCustomerIdRequest requestData)
        {
            return await _context.GetListSP<GetSubCustomerByCustomerIdResponse>(GETSUBCUSTOMERBYCUSTOMERID, new
            {
                requestData.CustomerId,
                requestData.Pagination!.PageNumber,
                requestData.Pagination.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }

        public async Task<AddEntityDto<int>> DeleteSubCustomer(int subCustomerMainCustomerId, short deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETESUBCUSTOMER, new
            {
                subCustomerMainCustomerId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
