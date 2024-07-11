using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Supplier;
using OMS.Domain.Entities.Entity.SupplierNotes;
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
        public async Task<AddEditResponse> AddEditSupplierBasicInformation(AddEditSupplierBasicInformationRequest requestData, short CurrentUserId)
        {
            SupplierDTO supplierDTO = requestData.ToMapp<AddEditSupplierBasicInformationRequest, SupplierDTO>();
            supplierDTO.CreatedBy = CurrentUserId;
            AddEditResponse responseData = await repositoryManager.supplier.AddEditSupplierBasicInformation(supplierDTO);

            AddEntityDTO<long> addEntityDTO = new();
            if (!string.IsNullOrEmpty(requestData.Note) && requestData.SupplierNoteId > 0)
            {
                SupplierNoteDTO supplierNotesUpdate = new()
                {
                    SupplierNoteId = requestData.SupplierNoteId,
                    Note = requestData.Note,
                    SupplierId = responseData.KeyValue
                };

                addEntityDTO = await repositoryManager.supplierNotes.UpdateSupplierNotes(supplierNotesUpdate);
            }
            else if (requestData.SupplierId > 0 && !string.IsNullOrEmpty(requestData.Note))
            {
                SupplierNoteDTO supplierNotesUpdate = new()
                {
                    SupplierId = responseData.KeyValue,
                    Note = requestData.Note,
                    CreatedBy = CurrentUserId
                };

                addEntityDTO = await repositoryManager.supplierNotes.AddSupplierNotes(supplierNotesUpdate);
            }
            responseData.NoteId = addEntityDTO.KeyValue;
            return responseData;
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

        public async Task<AddEntityDTO<int>> UpdateSupplierStatus(UpdateSupplierStatusRequest requestData, short CurrentUserId)
        {
            SupplierDTO supplierDTO = requestData.ToMapp<UpdateSupplierStatusRequest, SupplierDTO>();
            supplierDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.supplier.UpdateSupplierStatus(supplierDTO);
        }
        public async Task<AddEntityDTO<int>> CheckSupplierNameExist(CheckSupplierNameExistRequest requestData)
        {
            SupplierDTO supplierDTO = requestData.ToMapp<CheckSupplierNameExistRequest, SupplierDTO>();
            return await repositoryManager.supplier.CheckSupplierNameExist(supplierDTO);
        }

        public async Task<EntityList<GetSupplierAuditHistoryBySupplierIdResponse>> GetSupplierAuditHistoryBySupplierId(GetSupplierAuditHistoryBySupplierIdRequest queryRequest)
        {
            var supplierAuditList = await repositoryManager.supplier.GetSupplierAuditHistoryBySupplierId(queryRequest);
            return supplierAuditList!;
        }
        public async Task<List<GetSupplierDetailsBySupplierNameResponse>> GetSupplierDetailsBySupplierName(string supplierName)
        {
            return await repositoryManager.supplier.GetSupplierDetailsBySupplierName(supplierName);
        }
        #endregion

    }
}
