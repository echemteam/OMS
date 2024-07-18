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

        public async Task<AddEntityDTO<int>> AddContactEmail(AddContactEmailRequest requestData, short CurrentUserId)
        {
            EmailDTO emailDTO = requestData.ToMapp<AddContactEmailRequest, EmailDTO>();
            emailDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.emailAddress.AddContactEmail(emailDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateContactEmail(UpdateContactEmailRequest requestData, short CurrentUserId)
        {
            EmailDTO emailDTO = requestData.ToMapp<UpdateContactEmailRequest, EmailDTO>();
            emailDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.emailAddress.UpdateContactEmail(emailDTO);
        }
        public async Task<AddEntityDTO<int>> DeleteContactEmail(int emailId, int deletedBy)
        {
            return await repositoryManager.emailAddress.DeleteContactEmail(emailId, deletedBy);
        }

        //public async Task<List<GetEmailByContactIdResponse>> GetEmailByContactId(int contactId)
        //{
        //    List<GetEmailByContactIdResponse> emailList = await repositoryManager.emailAddress.GetEmailByContactId(contactId);
        //    return emailList;
        //}
    }
}
