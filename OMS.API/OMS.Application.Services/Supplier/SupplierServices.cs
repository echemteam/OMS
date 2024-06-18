﻿using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Entities.Entity.Supplier;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Supplier
{
    public class SupplierServices : BaseServices, ISupplierServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public SupplierServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Supplier Services
        public async Task<AddEntityDTO<int>> AddEditSupplierBasicInformation(AddEditSupplierBasicInformationRequest requestData, short CurrentUserId)
        {
            SupplierDTO supplierDTO = requestData.ToMapp<AddEditSupplierBasicInformationRequest, SupplierDTO>();
            supplierDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.supplier.AddEditSupplierBasicInformation(supplierDTO);
        }

        public async Task<GetSupplierBasicInformationByIdResponse> GetSupplierBasicInformationById(int supplierId)
        {
            return await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId);
        }

        public async Task<EntityList<GetSuppliersResponse>> GetSuppliers(GetSuppliersRequest queryRequest)
        {
            var supplierList = await repositoryManager.supplier.GetSuppliers(queryRequest);
            return supplierList!;
        }

        public async Task<AddEntityDTO<int>> UpdateSupplierInActiveStatus(UpdateSupplierInActiveStatusRequest requestData, short CurrentUserId)
        {
            SupplierDTO supplierDTO = requestData.ToMapp<UpdateSupplierInActiveStatusRequest, SupplierDTO>();
            supplierDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.supplier.UpdateSupplierInActiveStatus(supplierDTO);
        }
        public async Task<AddEntityDTO<int>> UpdateSupplierApproveStatus(UpdateSupplierApproveStatusRequest requestData, short CurrentUserId)
        {
            SupplierDTO supplierDTO = requestData.ToMapp<UpdateSupplierApproveStatusRequest, SupplierDTO>();
            supplierDTO.ApprovedBy = CurrentUserId;
            return await repositoryManager.supplier.UpdateSupplierApproveStatus(supplierDTO);
        }
        #endregion

    }
}
