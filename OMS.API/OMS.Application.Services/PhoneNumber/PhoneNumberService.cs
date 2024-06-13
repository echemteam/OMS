using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.PhoneNumber
{
    internal class PhoneNumberService : BaseServices, IPhoneNumberService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public PhoneNumberService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        public async Task<AddEntityDTO<int>> AddContactPhone(AddContactPhoneRequest requestData, short CurrentUserId)
        {
            PhoneDTO phoneDTO = requestData.ToMapp<AddContactPhoneRequest, PhoneDTO>();
            phoneDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.phoneNumber.AddContactPhone(phoneDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateContactPhone(UpdateContactPhoneRequest requestData, short CurrentUserId)
        {
            PhoneDTO phoneDTO = requestData.ToMapp<UpdateContactPhoneRequest, PhoneDTO>();
            phoneDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.phoneNumber.UpdateContactPhone(phoneDTO);
        }

        public async Task<AddEntityDTO<int>> DeleteContactPhone(int phoneId, int deletedBy)
        {
            return await repositoryManager.phoneNumber.DeleteContactPhone(phoneId, deletedBy);
        }

        public async Task<List<GetPhoneByContactIdResponse>> GetPhoneByContactId(int contactId)
        {
            List<GetPhoneByContactIdResponse> listData = await repositoryManager.phoneNumber.GetPhoneByContactId(contactId);
            return listData;
        }
    }
}
