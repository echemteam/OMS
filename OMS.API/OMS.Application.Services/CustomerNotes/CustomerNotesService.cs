using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerNotes;
using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.CustomerNotes
{
    internal class CustomerNotesService : BaseServices, ICustomerNotesService
    {
        #region variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region constructor
        public CustomerNotesService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        #region CustomerNotesServices
        public async Task<AddEntityDto<long>> AddCustomerNotes(AddCustomerNotesRequest requestData, short CurrentUserId)
        {
            CustomerNotesDto customerNotesDto = requestData.ToMapp<AddCustomerNotesRequest, CustomerNotesDto>();
            customerNotesDto.CreatedBy = CurrentUserId;
            return await repositoryManager.customerNotes.AddCustomerNotes(customerNotesDto);
        }


        public async Task<AddEntityDto<long>> UpdateCustomerNotes(UpdateCustomerNotesRequest requestData, short CurrentUserId)
        {
            CustomerNotesDto customerNotes = requestData.ToMapp<UpdateCustomerNotesRequest, CustomerNotesDto>();
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
