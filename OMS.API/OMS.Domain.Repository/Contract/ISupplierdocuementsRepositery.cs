﻿using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierDocuements;
using System.Data;

namespace OMS.Domain.Repository.Contract
{
    public interface ISupplierdocuementsRepositery
    {
        Task<AddEntityDto<int>> AddSupplierDocuments(SupplierDocumentsDto supplierDocuements, DataTable documentDataTable);
        Task<List<GetSupplierDocumentsByIdResponse>> GetSupplierDocumentsById(int supplierId);
        Task<AddEntityDto<int>> DeleteSupplierDocumentsById(int supplierDocumentId, int deletedBy);
        Task<AddEntityDto<int>> CheckDocumentsExistOrNot(byte? documentTypeId, string? name, int? supplierId);
    }
}
