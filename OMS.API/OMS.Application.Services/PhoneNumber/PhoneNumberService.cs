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

        public async Task<AddEntityDto<int>> AddContactPhone(AddContactPhoneRequest requestData, short CurrentUserId)
        {
            PhoneDto phoneDto = requestData.ToMapp<AddContactPhoneRequest, PhoneDto>();
            phoneDto.CreatedBy = CurrentUserId;
            return await repositoryManager.phoneNumber.AddContactPhone(phoneDto);
        }

        public async Task<AddEntityDto<int>> UpdateContactPhone(UpdateContactPhoneRequest requestData, short CurrentUserId)
        {
            PhoneDto phoneDto = requestData.ToMapp<UpdateContactPhoneRequest, PhoneDto>();
            phoneDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.phoneNumber.UpdateContactPhone(phoneDto);
        }

        public async Task<AddEntityDto<int>> DeleteContactPhone(int phoneId, int deletedBy)
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
