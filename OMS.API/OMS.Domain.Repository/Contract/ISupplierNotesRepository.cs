using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.API.Response.SupplierNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Entities.Entity.SupplierNotes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierNotesRepository
    {
        Task<AddEntityDTO<long>> AddSupplierNotes(SupplierNoteDTO addSupplierNotes);
        Task<List<GetSupplierNotesBySupplierIdResponse>> GetSupplierNotesBySupplierId(int supplierId);
        Task<AddEntityDTO<long>> UpdateSupplierNotes(SupplierNoteDTO supplierNotesUpdate);
    }
}
