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
        public async Task<AddEntityDTO<int>> AddEditContact(AddEditContactRequest requestData, short CurrentUserId)
        {
            ContactDTO contactDTO = requestData.ToMapp<AddEditContactRequest, ContactDTO>();
            contactDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.contact.AddEditContact(contactDTO);
        }

        public async Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerId(int customerId)
        {
            List<GetContactByCustomerIdResponse> contactList = await repositoryManager.contact.GetContactByCustomerId(customerId);

            return contactList;
        }
        #endregion

    }
}
