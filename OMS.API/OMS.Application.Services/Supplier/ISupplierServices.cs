﻿using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Supplier
{
    public interface ISupplierServices
    {
        Task<AddEditResponse> AddEditSupplierBasicInformation(AddEditSupplierBasicInformationRequest requestData, short CurrentUserId);
        Task<GetSupplierBasicInformationByIdResponse> GetSupplierBasicInformationById(int supplierId);
        Task<EntityList<GetSuppliersResponse>> GetSuppliers(GetSuppliersRequest queryRequest);
        Task<AddEntityDto<int>> UpdateSupplierInActiveStatus(UpdateSupplierInActiveStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateSupplierApproveStatus(UpdateSupplierApproveStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateSupplierStatus(UpdateSupplierStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> CheckSupplierNameExist(CheckSupplierNameExistRequest requestData);
        Task<EntityList<GetSupplierAuditHistoryBySupplierIdResponse>> GetSupplierAuditHistoryBySupplierId(GetSupplierAuditHistoryBySupplierIdRequest queryRequest);
        Task<List<GetSupplierDetailsBySupplierNameResponse>> GetSupplierDetailsBySupplierName(string supplierName);
        Task<AddEntityDto<int>> AddEditResponsibleUserForSupplier(AddEditResponsibleUserForSupplierRequest requestData, short CurrentUserId);
        Task<List<GetSearchSuppliersDetailsByNameEmailWebsiteResponse>> GetSearchSuppliersDetailsByNameEmailWebsite(GetSearchSuppliersDetailsByNameEmailWebsiteRequest requestData);
    }
}
