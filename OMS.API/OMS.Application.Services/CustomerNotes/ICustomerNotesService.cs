using OMS.Domain.Entities.API.Request.CustomerNotes;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.CustomerNotes
{
    public interface ICustomerNotesService
    {
        Task<AddEntityDTO<long>> AddCustomerNotes(AddCustomerNotesRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<long>> UpdateCustomerNotes(UpdateCustomerNotesRequest requestData, short CurrentUserId);
        Task<List<GetCustomerNotesByCustomerIdResponse>> GetCustomerNoteByCustomerId(int customerId);
         
    }
}
