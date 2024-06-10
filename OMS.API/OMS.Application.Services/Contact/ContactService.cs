using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Contact
{
    internal class ContactService : BaseServices, IContactService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public ContactService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region  Contact Service
        public async Task<AddEntityDTO<int>> AddContact(AddContactRequest requestData, short CurrentUserId)
        {
            ContactDTO contactDTO = requestData.ToMapp<AddContactRequest, ContactDTO>();
            contactDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.contact.AddContact(contactDTO);
        }

        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerIdId(int customerId)
        {
            List<GetContactByCustomerIdResponse> contactList = await repositoryManager.contact.GetContactByCustomerIdId(customerId);
            foreach (var contact in contactList)
            {
                List<GetEmailByContactIdResponse> emailList = await repositoryManager.contact.GetEmailByContactId(contact.ContactId!.Value);
                contact.EmailList = emailList;

                List<GetPhoneByContactIdResponse> phoneList = await repositoryManager.contact.GetPhoneByContactId(contact.ContactId!.Value);
                contact.PhoneList = phoneList;
            }

            return contactList;
        }

        public async Task<AddEntityDTO<int>> AddContactEmail(AddContactEmailRequest requestData, short CurrentUserId)
        {
            EmailDTO emailDTO = requestData.ToMapp<AddContactEmailRequest, EmailDTO>();
            emailDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.contact.AddContactEmail(emailDTO);
        }
        public async Task<AddEntityDTO<int>> AddContactPhone(AddContactPhoneRequest requestData, short CurrentUserId)
        {
            PhoneDTO phoneDTO = requestData.ToMapp<AddContactPhoneRequest, PhoneDTO>();
            phoneDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.contact.AddContactPhone(phoneDTO);
        }
        #endregion

    }
}
