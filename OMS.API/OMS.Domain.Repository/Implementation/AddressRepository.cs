using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class AddressRepository : BaseRepository<Addresses>, IAddressRepository
    {
        #region SP Name
        const string ADDADDRESS = "AddAddress";
        const string GETADDRESSSBYCUSTOMERID = "GetAddresssByCustomerId";
        const string UPDATEADDADDRESS = "UpdateAddAddress";
        const string GETADDRESSSBYSUPPLIERID = "GetAddresssBySupplierId";
        const string GETCUSTOMERADDRESSSBYADDRESSID = "GetCustomerAddresssByAddressId";
        const string GETSUPPLIERADDRESSSBYADDRESSID = "GetSupplierAddresssByAddressId";
        #endregion

        public AddressRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Address Repository
        public async Task<AddEntityDto<int>> AddAddress(AddressDto address)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDADDRESS, new
            {
                address.CustomerId,
                address.AddressTypeId,
                address.AddressLine1,
                address.AddressLine2,
                address.AddressLine3,
                address.AddressLine4,
                address.AddressLine5,
                address.CountryId,
                address.StateId,
                address.CityId,
                address.ZipCode,
                address.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetAddresssByCustomerIdResponse>> GetAddresssByCustomerId(int customerId)
        {
            List<GetAddresssByCustomerIdResponse> getAddresssByCustomerIdResponse = await _context.GetList<GetAddresssByCustomerIdResponse>(GETADDRESSSBYCUSTOMERID, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getAddresssByCustomerIdResponse;

        }

        public async Task<GetCustomerAddresssByAddressIdResponse> GetCustomerAddresssByAddressId(int addressId)
        {
            GetCustomerAddresssByAddressIdResponse getCustomerAddresssByAddressIdResponse = await _context.GetFrist<GetCustomerAddresssByAddressIdResponse>(GETCUSTOMERADDRESSSBYADDRESSID, new
            {
                addressId
            }, commandType: CommandType.StoredProcedure);
            return getCustomerAddresssByAddressIdResponse;

        }
        public async Task<AddEntityDto<int>> UpdateAddAddress(AddressDto address)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATEADDADDRESS, new
            {
                address.AddressId,
                address.CustomerId,
                address.AddressTypeId,
                address.AddressLine1,
                address.AddressLine2,
                address.AddressLine3,
                address.AddressLine4,
                address.AddressLine5,
                address.CountryId,
                address.StateId,
                address.CityId,
                address.ZipCode,
                address.UpdatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetAddresssBySupplierIdResponse>> GetAddresssBySupplierId(int supplierId)
        {
            List<GetAddresssBySupplierIdResponse> getAddresssBySupplierIdResponse = await _context.GetList<GetAddresssBySupplierIdResponse>(GETADDRESSSBYSUPPLIERID, new
            {
                supplierId
            }, commandType: CommandType.StoredProcedure);
            return getAddresssBySupplierIdResponse;

        }

        public async Task<GetSupplierAddresssByAddressIdResponse> GetSupplierAddresssByAddressId(int addressId)
        {
            GetSupplierAddresssByAddressIdResponse getSupplierAddresssByAddressIdResponse = await _context.GetFrist<GetSupplierAddresssByAddressIdResponse>(GETSUPPLIERADDRESSSBYADDRESSID, new
            {
                addressId
            }, commandType: CommandType.StoredProcedure);
            return getSupplierAddresssByAddressIdResponse;

        }
        #endregion
    }
}
