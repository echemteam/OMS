using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Entities.Entity.Supplier;
using OMS.Domain.Entities.Entity.SupplierNotes;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
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
            SupplierDto supplierDto = requestData.ToMapp<AddEditSupplierBasicInformationRequest, SupplierDto>();
            if (requestData.Base64File != null)
            {
                supplierDto.AttachmentName = FileManager.SaveFile(
                                requestData.Base64File!,
                                Path.Combine(commonSettingService.ApplicationSettings.SaveFilePath!, requestData.StoragePath!),
                                requestData.AttachmentName!);
            }
            supplierDto.CreatedBy = CurrentUserId;
            AddEditResponse responseData = await repositoryManager.supplier.AddEditSupplierBasicInformation(supplierDto);

            if (!string.IsNullOrEmpty(requestData.Note) && responseData.KeyValue > 0)
            {
                AddEntityDto<long> addEntityDto = new();
                SupplierNoteDto supplierNotes = new()
                {
                    SupplierNoteId = requestData.SupplierNoteId,
                    Note = requestData.Note,
                    SupplierId = responseData.KeyValue,
                    CreatedBy = CurrentUserId
                };

                if (requestData.SupplierNoteId > 0)
                {
                    // Update existing supplier note
                    supplierNotes.UpdatedBy = CurrentUserId;
                    addEntityDto = await repositoryManager.supplierNotes.UpdateSupplierNotes(supplierNotes);
                    responseData.NoteId = addEntityDto.KeyValue;
                }
                else
                {
                    // Add new supplier note
                    addEntityDto = await repositoryManager.supplierNotes.AddSupplierNotes(supplierNotes);
                    responseData.NoteId = addEntityDto.KeyValue;
                }
            }
            return responseData;
        }

        public async Task<GetSupplierBasicInformationByIdResponse> GetSupplierBasicInformationById(int supplierId)
        {
            GetSupplierBasicInformationByIdResponse getSupplierBasicInformationByIdResponse = new();
            getSupplierBasicInformationByIdResponse = await repositoryManager.supplier.GetSupplierBasicInformationById(supplierId);
            if (getSupplierBasicInformationByIdResponse.AttachmentName != null)
            {
                var filePath = Path.Combine(commonSettingService.ApplicationSettings.SaveFilePath!, "SupplierProfilePic"!, getSupplierBasicInformationByIdResponse.AttachmentName);
                if (File.Exists(filePath))
                {
                    byte[] imageArray = await File.ReadAllBytesAsync(filePath);
                    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                    getSupplierBasicInformationByIdResponse.Base64File = base64ImageRepresentation;
                }
            }
            return getSupplierBasicInformationByIdResponse;
        }

        public async Task<EntityList<GetSuppliersResponse>> GetSuppliers(GetSuppliersRequest queryRequest)
        {
            var supplierList = await repositoryManager.supplier.GetSuppliers(queryRequest);
            return supplierList!;
        }

        public async Task<AddEntityDto<int>> UpdateSupplierInActiveStatus(UpdateSupplierInActiveStatusRequest requestData, short CurrentUserId)
        {
            SupplierDto supplierDto = requestData.ToMapp<UpdateSupplierInActiveStatusRequest, SupplierDto>();
            supplierDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.supplier.UpdateSupplierInActiveStatus(supplierDto);
        }
        public async Task<AddEntityDto<int>> UpdateSupplierApproveStatus(UpdateSupplierApproveStatusRequest requestData, short CurrentUserId)
        {
            SupplierDto supplierDto = requestData.ToMapp<UpdateSupplierApproveStatusRequest, SupplierDto>();
            supplierDto.ApprovedBy = CurrentUserId;
            return await repositoryManager.supplier.UpdateSupplierApproveStatus(supplierDto);
        }

        public async Task<AddEntityDto<int>> UpdateSupplierStatus(UpdateSupplierStatusRequest requestData, short CurrentUserId)
        {
            SupplierDto supplierDto = requestData.ToMapp<UpdateSupplierStatusRequest, SupplierDto>();
            supplierDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.supplier.UpdateSupplierStatus(supplierDto);
        }
        public async Task<AddEntityDto<int>> CheckSupplierNameExist(CheckSupplierNameExistRequest requestData)
        {
            SupplierDto supplierDto = requestData.ToMapp<CheckSupplierNameExistRequest, SupplierDto>();
            return await repositoryManager.supplier.CheckSupplierNameExist(supplierDto);
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

        public async Task<AddEntityDto<int>> AddEditResponsibleUserForSupplier(AddEditResponsibleUserForSupplierRequest requestData, short currentUserId)
        {
            return await repositoryManager.supplier.AddEditResponsibleUserForSupplier(requestData, currentUserId); ;
        }
        public async Task<List<GetSearchSuppliersDetailsByNameEmailWebsiteResponse>> GetSearchSuppliersDetailsByNameEmailWebsite(GetSearchSuppliersDetailsByNameEmailWebsiteRequest requestData)
        {
            return await repositoryManager.supplier.GetSearchSuppliersDetailsByNameEmailWebsite(requestData);
        }
        #endregion
    }
}
