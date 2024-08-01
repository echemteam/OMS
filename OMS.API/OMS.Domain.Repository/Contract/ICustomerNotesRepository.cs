using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerNotesRepository
    {
        Task<AddEntityDTO<long>> AddCustomerNotes(CustomerNotesDTO addCustomerNotes);
        Task<AddEntityDTO<long>> UpdateCustomerNotes(CustomerNotesDTO updateCustomerNotes);
        Task<List<GetCustomerNotesByCustomerIdResponse>> GetCustomerNoteByCustomerId(int customerId);

    }
}
