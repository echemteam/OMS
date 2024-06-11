using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerNotes;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.CustomerNotes
{
    internal class CustomerNotesService : BaseServices, ICustomerNotesService
    {
        #region varisble
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region constructor
        public CustomerNotesService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        #region CustomerNotesServices
        public async Task<AddEntityDTO<long>> AddCustomerNotes(AddCustomerNotesRequest requestData, short CurrentUserId)
        {
            CustomerNotesDTO customerNotesDTO= requestData.ToMapp<AddCustomerNotesRequest, CustomerNotesDTO>();
            customerNotesDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.customerNotes.AddCustomerNotes(customerNotesDTO);
        }


        public async Task<AddEntityDTO<long>> UpdateCustomerNotes(UpdateCustomerNotesRequest requestData, short CurrentUserId)
        {
             CustomerNotesDTO customerNotes = requestData.ToMapp<UpdateCustomerNotesRequest, CustomerNotesDTO>();
            customerNotes.UpdatedBy = CurrentUserId;
            return await repositoryManager.customerNotes.UpdateCustomerNotes(customerNotes);
        }
        public Task<List<GetCustomerNotesByCustomerIdResponse>> GetCustomerNoteByCustomerId(int customerId)
        {
            return repositoryManager.customerNotes.GetCustomerNoteByCustomerId(customerId);
        }
        #endregion
    }
}
