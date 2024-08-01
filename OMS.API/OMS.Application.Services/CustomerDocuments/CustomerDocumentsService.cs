using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.CustomerDocuments
{
    public class CustomerDocumentsService : BaseServices, ICustomerDocumentsService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public CustomerDocumentsService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Customer Documents Services
        public async Task<AddEntityDTO<int>> AddCustomerDocuments(AddCustomerDocumentsRequest requestData, short CurrentUserId)
        {
            AddEntityDTO<int> responseData = await repositoryManager.customerDocuments.CheckDocumentsExistOrNot(requestData.DocumentTypeId, requestData.Name, requestData.CustomerId);

            if (responseData.KeyValue > 0)
            {
                if (requestData.Base64File != null && requestData.Name != null)
                {
                    string AESKey = commonSettingService.EncryptionSettings.AESKey!;
                    string AESIV = commonSettingService.EncryptionSettings.AESIV!;
                    requestData.Attachment = FileManager.SaveEncryptFile(requestData.Base64File!, commonSettingService.ApplicationSettings.SaveFilePath + "\\" + requestData.StoragePath + "\\" + requestData.CustomerId, requestData.Attachment!, AESKey, AESIV);

                }
                CustomerDocumentsDTO customerDocumentsDTO = requestData.ToMapp<AddCustomerDocumentsRequest, CustomerDocumentsDTO>();
                customerDocumentsDTO.CreatedBy = CurrentUserId;
                responseData = await repositoryManager.customerDocuments.AddCustomerDocuments(customerDocumentsDTO);
            }
            return responseData!;
        }

        public async Task<List<GetCustomerDocumentsByIdResponse>> GetCustomerDocumentsById(int customerId)
        {
            List<GetCustomerDocumentsByIdResponse> documentList = await repositoryManager.customerDocuments.GetCustomerDocumentsById(customerId);
            return documentList;
        }

        public async Task<AddEntityDTO<int>> DeleteCustomerDocumentsById(int customerDocumentId, int deletedBy)
        {
            return await repositoryManager.customerDocuments.DeleteCustomerDocumentsById(customerDocumentId, deletedBy);
        }

        #endregion
    }
}
