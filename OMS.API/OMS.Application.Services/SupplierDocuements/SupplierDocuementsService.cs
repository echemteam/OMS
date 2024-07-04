using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.SupplierDocuements;
using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierDocuements;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
using OMS.Shared.Services.Contract;


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
        public async Task<AddEntityDTO<int>> AddSupplierDocuments(AddSupplierDocumentsRequest requestData, short CurrentUserId)
        {
            AddEntityDTO<int> responseData = new();

            responseData = await repositoryManager.supplierdocuements.CheckDocumentsExistOrNot(requestData.DocumentTypeId, requestData.Name, requestData.SupplierId);

            if (responseData.KeyValue > 0)
            {
                if (requestData.Base64File != null && requestData.Name != null)
                {
                    string AESKey = commonSettingService.EncryptionSettings.AESKey!;
                    string AESIV = commonSettingService.EncryptionSettings.AESIV!;
                    requestData.Attachment = FileManager.SaveEncryptFile(requestData.Base64File!, commonSettingService.ApplicationSettings.SaveFilePath + "\\" + requestData.StoragePath + "\\" + requestData.SupplierId, requestData.Attachment!, AESKey, AESIV);
                }
                SupplierDocumentsDTO supplierDocumentsDTO = requestData.ToMapp<AddSupplierDocumentsRequest, SupplierDocumentsDTO>();
                supplierDocumentsDTO.CreatedBy = CurrentUserId;
                responseData = await repositoryManager.supplierdocuements.AddSupplierDocuments(supplierDocumentsDTO);
            }
            return responseData;
        }
        public async Task<List<GetSupplierDocumentsByIdResponse>> GetSupplierDocumentsById(int supplierId)
        {
            List<GetSupplierDocumentsByIdResponse> documentList = await repositoryManager.supplierdocuements.GetSupplierDocumentsById(supplierId);
            return documentList;
        }
        public async Task<AddEntityDTO<int>> DeleteSupplierDocumentsById(int supplierDocumentId, int deletedBy)
        {
            return await repositoryManager.supplierdocuements.DeleteSupplierDocumentsById(supplierDocumentId, deletedBy);
        }
        #endregion
    }
}
