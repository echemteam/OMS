using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.EmailAddress
{
    internal class EmailAddressService : BaseServices, IEmailAddressService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public EmailAddressService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        public async Task<AddEntityDto<int>> AddContactEmail(AddContactEmailRequest requestData, short CurrentUserId)
        {
            EmailDto emailDto = requestData.ToMapp<AddContactEmailRequest, EmailDto>();
            emailDto.CreatedBy = CurrentUserId;
            return await repositoryManager.emailAddress.AddContactEmail(emailDto);
        }

        public async Task<AddEntityDto<int>> UpdateContactEmail(UpdateContactEmailRequest requestData, short CurrentUserId)
        {
            EmailDto emailDto = requestData.ToMapp<UpdateContactEmailRequest, EmailDto>();
            emailDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.emailAddress.UpdateContactEmail(emailDto);
        }
        public async Task<AddEntityDto<int>> DeleteContactEmail(int emailId, int deletedBy)
        {
            return await repositoryManager.emailAddress.DeleteContactEmail(emailId, deletedBy);
        }


    }
}
