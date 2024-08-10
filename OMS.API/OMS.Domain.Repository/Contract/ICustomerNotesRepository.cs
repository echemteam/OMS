using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerNotesRepository
    {
        Task<AddEntityDto<long>> AddCustomerNotes(CustomerNotesDto addCustomerNotes);
        Task<AddEntityDto<long>> UpdateCustomerNotes(CustomerNotesDto updateCustomerNotes);
        Task<List<GetCustomerNotesByCustomerIdResponse>> GetCustomerNoteByCustomerId(int customerId);

    }
}
