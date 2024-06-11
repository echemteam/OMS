using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomerNotesRepository
    {
        Task<AddEntityDTO<long>> AddCustomerNotes(CustomerNotesDTO addCustomerNotes);
        Task<AddEntityDTO<long>> UpdateCustomerNotes(CustomerNotesDTO updateCustomerNotes);
        Task<List<GetCustomerNotesByCustomerIdResponse>>GetCustomerNoteByCustomerId(int customerId);
        
    }
}
