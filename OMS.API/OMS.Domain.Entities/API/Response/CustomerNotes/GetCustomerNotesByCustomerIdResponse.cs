using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.CustomerNotes
{
    public class GetCustomerNotesByCustomerIdResponse
    {
        public long? CustomerNoteId { get; set; }
        public string? Note { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
    }
}
