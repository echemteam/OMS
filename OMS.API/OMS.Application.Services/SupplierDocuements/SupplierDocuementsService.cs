using Common.Helper.Export;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.SupplierDocuements;
using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierDocuements;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
using OMS.Shared.Services.Contract;
using System.Data;


namespace OMS.Application.Services.SupplierDocuements
{
    public class SupplierDocuementsService : BaseServices, ISupplierDocuementsService
    {
        #region variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region
        public SupplierDocuementsService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        #region Services
        public async Task<AddEntityDto<int>> AddSupplierDocuments(AddSupplierDocumentsRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responseData = new();

            if (requestData.DocumentInfoList != null)
            {
                foreach (var document in requestData.DocumentInfoList)
                {
                    if (!string.IsNullOrEmpty(document.Base64File) && !string.IsNullOrEmpty(requestData.StoragePath))
                    {
                        string AESKey = commonSettingService.EncryptionSettings.AESKey!;
                        string AESIV = commonSettingService.EncryptionSettings.AESIV!;

                        document.Attachment = FileManager.SaveEncryptFile(
                            document.Base64File!,
                            Path.Combine(commonSettingService.ApplicationSettings.SaveFilePath, requestData.StoragePath, requestData.SupplierId.ToString()),
                            document.Attachment!,
                            AESKey,
                            AESIV
                        );
                    }
                }

                // Map the request to the DTO and add it to the repository
                SupplierDocumentsDto supplierDocumentsDto = requestData.ToMapp<AddSupplierDocumentsRequest, SupplierDocumentsDto>();
                supplierDocumentsDto.CreatedBy = CurrentUserId;
                var modifyData = requestData.DocumentInfoList.Select(data => new { data.Name, data.Attachment, data.DocumentTypeId,data.DocumentType }).ToList();
                DataTable documentDataTable = ExportHelper.ListToDataTable(modifyData);
                responseData = await repositoryManager.supplierdocuements.AddSupplierDocuments(supplierDocumentsDto, documentDataTable);
            }

            return responseData;
        }
        public async Task<List<GetSupplierDocumentsByIdResponse>> GetSupplierDocumentsById(int supplierId)
        {
            List<GetSupplierDocumentsByIdResponse> documentList = await repositoryManager.supplierdocuements.GetSupplierDocumentsById(supplierId);
            return documentList;
        }
        public async Task<AddEntityDto<int>> DeleteSupplierDocumentsById(int supplierDocumentId, int deletedBy)
        {
            return await repositoryManager.supplierdocuements.DeleteSupplierDocumentsById(supplierDocumentId, deletedBy);
        }
        #endregion
    }
}
