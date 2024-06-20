using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Entities.Entity.SupplierDocuements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierdocuementsRepositery
    {
        Task<AddEntityDTO<int>> AddSupplierDocuments(SupplierDocumentsDTO supplierDocuments);
        Task<List<GetSupplierDocumentsByIdResponse>> GetSupplierDocumentsById(int supplierId);
        Task<AddEntityDTO<int>> DeleteSupplierDocumentsById(int supplierDocumentId, int deletedBy);
    }
}
