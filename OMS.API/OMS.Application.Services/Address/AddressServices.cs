using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Address;
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
            AddressDTO addressDTO = requestData.ToMapp<AddAddressRequest, AddressDTO>();
            addressDTO.CreatedBy = CurrentUserId;
            addressDTO.Title = "Testing";
            return await repositoryManager.address.AddAddress(addressDTO);
        }

        public Task<List<GetAddresssByCustomerIdResponse>> GetAddresssByCustomerId(int customerId)
        {
            return repositoryManager.address.GetAddresssByCustomerId(customerId);
        }

        public async Task<AddEntityDTO<int>> UpdateAddAddress(UpdateAddressRequest requestData, short CurrentUserId)
        {
            AddressDTO addressDTO = requestData.ToMapp<UpdateAddressRequest, AddressDTO>();
            addressDTO.UpdatedBy = CurrentUserId;
            addressDTO.Title = "UpdateTesting";
            return await repositoryManager.address.UpdateAddAddress(addressDTO);
        }
        #endregion
    }
}
