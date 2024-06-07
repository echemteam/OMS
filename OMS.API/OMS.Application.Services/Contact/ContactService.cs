using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Address;
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

        public Task<List<GetContactByCustomerIdResponse>> GetContactByCustomerIdId(int customerId)
        {
            return repositoryManager.contact.GetContactByCustomerIdId(customerId);
        }

        //public async Task<AddEntityDTO<int>> AddEmail(AddContactRequest requestData, short CurrentUserId)
        //{
        //    ContactDTO contactDTO = requestData.ToMapp<AddContactRequest, ContactDTO>();
        //    contactDTO.CreatedBy = CurrentUserId;
        //    return await repositoryManager.contact.AddEmail(contactDTO);
        //}
        //public async Task<AddEntityDTO<int>> AddContact(AddContactRequest requestData, short CurrentUserId)
        //{
        //    ContactDTO contactDTO = requestData.ToMapp<AddContactRequest, ContactDTO>();
        //    contactDTO.CreatedBy = CurrentUserId;
        //    return await repositoryManager.contact.AddContact(contactDTO);
        //}
        #endregion

    }
}
