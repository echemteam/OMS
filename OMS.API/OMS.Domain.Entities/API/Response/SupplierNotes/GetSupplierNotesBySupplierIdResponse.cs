using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.SupplierNotes
{
    public class GetSupplierNotesBySupplierIdResponse
    {
        public long? SupplierNoteId { get; set; }
        public string? Note { get; set; }
    
        public DateTime? NoteDate { get; set; }
        public string? FullName { get; set; }
    }
}
