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
        public  AddressServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Address Services
        public async Task<AddEntityDto<int>> AddAddress(AddAddressRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responceData = new();
            string[] addressTypeIds = requestData.AddressTypeId!.Split(',');

            foreach (var singleAddressTypeId in addressTypeIds)
            {
                requestData.AddressTypeId = singleAddressTypeId;
                AddressDto addressDto = requestData.ToMapp<AddAddressRequest, AddressDto>();
                addressDto.CreatedBy = CurrentUserId;
                responceData = await repositoryManager.address.AddAddress(addressDto);

                if (responceData.KeyValue > 0)
                {
                    await LinkSameAddress(requestData, responceData.KeyValue, CurrentUserId);
                }

                if (responceData.KeyValue > 0 && requestData.IsShippingAndBilling == true && requestData.CustomerId > 0)
                {
                    if (int.TryParse(singleAddressTypeId, out int addressTypeId))
                    {
                        switch (addressTypeId)
                        {
                            case (int)AddressType.Billing:
                                requestData.AddressTypeId = ((int)AddressType.Shipping).ToString();
                                break;

                            case (int)AddressType.Shipping:
                                requestData.AddressTypeId = ((int)AddressType.Billing).ToString();
                                break;
                        }
                    }
                    var duplicateResponseData = await repositoryManager.address.AddAddress(addressDto);
                    await LinkSameAddress(requestData, duplicateResponseData.KeyValue, CurrentUserId);
                }
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
                    AddressTypeId = short.Parse(requestData.AddressTypeId!),
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
                    AddressTypeId = short.Parse(requestData.AddressTypeId!)
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


        public async Task<AddEntityDto<int>> UpdateAddAddress(UpdateAddressRequest requestData, short CurrentUserId)
        {
            AddressDto addressDto = requestData.ToMapp<UpdateAddressRequest, AddressDto>();
            addressDto.UpdatedBy = CurrentUserId;
            AddEntityDto<int> responceData = await repositoryManager.address.UpdateAddAddress(addressDto);

            if (requestData.CustomerId > 0 && responceData.KeyValue > 0)
            {
                UpdateAddressForCustomerRequest updateAddressForCustomerRequest = new()
                {
                    CustomerAddressId = requestData.CustomerAddressId,
                    CustomerId = requestData.CustomerId,
                    AddressId = requestData.AddressId,
                    AddressTypeId = addressDto.AddressTypeId,
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
                    AddressTypeId = addressDto.AddressTypeId
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
