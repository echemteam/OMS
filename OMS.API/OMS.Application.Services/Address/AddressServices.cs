using Common.Helper.Enum;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Address;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.Entity.Address;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Address
{
    public class AddressServices : BaseServices, IAddressServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public AddressServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Address Services
        public async Task<AddEntityDTO<int>> AddAddress(AddAddressRequest requestData, short CurrentUserId)
        {
            AddEntityDTO<int> responceData = new();

            AddressDTO addressDTO = requestData.ToMapp<AddAddressRequest, AddressDTO>();
            addressDTO.CreatedBy = CurrentUserId;
            responceData = await repositoryManager.address.AddAddress(addressDTO);

            if (responceData.KeyValue > 0)
            {
                await LinkSameAddress(requestData, responceData.KeyValue, CurrentUserId);
            }

            if (responceData.KeyValue > 0 && requestData.IsShippingAndBilling == true)
            {
                switch (requestData.AddressTypeId)
                {
                    case (short?)AddressType.Billing:
                        requestData.AddressTypeId = (short?)AddressType.Shipping;
                        break;

                    case (short?)AddressType.Shipping:
                        requestData.AddressTypeId = (short?)AddressType.Billing;
                        break;
                }
                var duplicateResponseData = await repositoryManager.address.AddAddress(addressDTO);
                await LinkSameAddress(requestData, duplicateResponseData.KeyValue, CurrentUserId);
            }

            return responceData;
        }

        private async Task LinkSameAddress(AddAddressRequest requestData, int addressId, short CurrentUserId)
        {
            if (requestData.CustomerId > 0)
            {
                AddAddressForCustomerRequest addAddressForCustomerRequest = new()
                {
                    CustomerId = requestData.CustomerId,
                    AddressId = addressId,
                    AddressTypeId = requestData.AddressTypeId,
                    IsPreferredShipping = requestData.IsPreferredShipping,
                    IsPreferredBilling = requestData.IsPreferredBilling
                };

                _ = await repositoryManager.customers.AddAddressForCustomer(addAddressForCustomerRequest, CurrentUserId);
            }
            else if (requestData.SupplierId > 0)
            {
                AddAddressForSupplierRequest addAddressForCustomerRequest = new()
                {
                    SupplierId = requestData.SupplierId,
                    AddressId = addressId,
                    AddressTypeId = requestData.AddressTypeId
                };
                _ = await repositoryManager.supplier.AddAddressForSupplier(addAddressForCustomerRequest, CurrentUserId);
            }
        }
        public Task<List<GetAddresssByCustomerIdResponse>> GetAddresssByCustomerId(int customerId)
        {
            return repositoryManager.address.GetAddresssByCustomerId(customerId);
        }

        public Task<GetCustomerAddresssByAddressIdResponse> GetCustomerAddresssByAddressId(int addressId)
        {
            return repositoryManager.address.GetCustomerAddresssByAddressId(addressId);
        }


        public async Task<AddEntityDTO<int>> UpdateAddAddress(UpdateAddressRequest requestData, short CurrentUserId)
        {
            AddEntityDTO<int> responceData = new();
            AddressDTO addressDTO = requestData.ToMapp<UpdateAddressRequest, AddressDTO>();
            addressDTO.UpdatedBy = CurrentUserId;
            responceData = await repositoryManager.address.UpdateAddAddress(addressDTO);

            if (requestData.CustomerId > 0 && responceData.KeyValue > 0)
            {
                UpdateAddressForCustomerRequest updateAddressForCustomerRequest = new()
                {
                    CustomerAddressId = requestData.CustomerAddressId,
                    CustomerId = requestData.CustomerId,
                    AddressId = requestData.AddressId,
                    AddressTypeId = addressDTO.AddressTypeId,
                    IsPreferredShipping = requestData.IsPreferredShipping,
                    IsPreferredBilling = requestData.IsPreferredBilling
                };

                _ = await repositoryManager.customers.UpdateAddressForCustomer(updateAddressForCustomerRequest, CurrentUserId);
            }
            else if (requestData.SupplierId > 0 && responceData.KeyValue > 0)
            {
                UpdateAddressForSupplierRequest updateAddressForCustomerRequest = new()
                {
                    SupplierId = requestData.SupplierId,
                    AddressId = requestData.AddressId,
                    AddressTypeId = addressDTO.AddressTypeId
                };
                _ = await repositoryManager.supplier.UpdateAddressForSupplier(updateAddressForCustomerRequest, CurrentUserId);
            }
            return responceData;
        }

        public Task<List<GetAddresssBySupplierIdResponse>> GetAddresssBySupplierId(int supplierId)
        {
            return repositoryManager.address.GetAddresssBySupplierId(supplierId);
        }

        public Task<GetSupplierAddresssByAddressIdResponse> GetSupplierAddresssByAddressId(int addressId)
        {
            return repositoryManager.address.GetSupplierAddresssByAddressId(addressId);
        }
        #endregion
    }
}
