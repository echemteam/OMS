using Common.Helper.Export;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System.Data;

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
        public async Task<AddEntityDTO<int>> AddEditContact(AddEditContactRequest requestData, short CurrentUserId)
        {
            AddEntityDTO<int> responceData = new();
            ContactDTO contactDTO = requestData.ToMapp<AddEditContactRequest, ContactDTO>();
            contactDTO.CreatedBy = CurrentUserId;
            responceData = await repositoryManager.contact.AddEditContact(contactDTO);

            if (responceData.KeyValue > 0)
            {
                List<AddContactEmailRequest> emailDT = requestData.EmailList!;
                List<AddContactPhoneRequest> PhoneDT = requestData.PhoneList!;

                int contactId = responceData.KeyValue;

                DataTable emailDataTable = ExportHelper.ListToDataTable(emailDT);
                DataTable phoneDataTable = ExportHelper.ListToDataTable(PhoneDT);

                _ = await repositoryManager.emailAddress.AddEditContactEmail(emailDataTable, contactId);

                _ = await repositoryManager.phoneNumber.AddEditContactPhone(phoneDataTable, contactId);
            }
            return responceData;
        }

        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId)
        {
            List<GetContactByCustomerIdResponse> contactList = await repositoryManager.contact.GetContactByCustomerId(customerId);
            foreach (var contact in contactList)
            {
                contact.EmailAddressLst = await repositoryManager.emailAddress.GetEmailByContactId(contact.ContactId);
                contact.PhoneNumberLsit = await repositoryManager.phoneNumber.GetPhoneByContactId(contact.ContactId);
            }
            return contactList;
        }
        #endregion

    }
}
