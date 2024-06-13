using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
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
            if (requestData.Base64File != null && requestData.Attachment != null)
            {
                requestData.Attachment = FileManager.SaveFile(requestData.Base64File, commonSettingService.ApplicationSettings.SaveFilePath + "\\" + requestData.StoragePath, requestData.Attachment);
            }
            CustomerDocumentsDTO customerDocumentsDTO = requestData.ToMapp<AddCustomerDocumentsRequest, CustomerDocumentsDTO>();
            customerDocumentsDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.customerDocuments.AddCustomerDocuments(customerDocumentsDTO);
        }
        #endregion
    }
}
