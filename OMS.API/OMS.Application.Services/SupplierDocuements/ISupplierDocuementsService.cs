using OMS.Domain.Entities.API.Request.SupplierDocuements;
using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Domain.Entities.Entity.CommonEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Application.Services.SupplierDocuements
{
    public  interface ISupplierDocuementsService
    {
        Task<AddEntityDTO<int>> AddSupplierDocuments(AddSupplierDocumentsRequest requestData, short CurrentUserId);
        Task<List<GetSupplierDocumentsByIdResponse>> GetSupplierDocumentsById(int supplierId);
        Task<AddEntityDTO<int>> DeleteSupplierDocumentsById(int supplierDocumentId, int deletedBy);
    }
}
