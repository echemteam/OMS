using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Common;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Common
{
    public class CommonServices : BaseServices, ICommonServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public CommonServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        public Task<List<GetAllRolesResponse>> GetAllRoles()
        {
            return repositoryManager.commonRepository.GetAllRoles();
        }

        public Task<List<GetUnAssignedUserByRoleIdResponse>> GetUnAssignedUserByRoleId(byte roleId)
        {
            return repositoryManager.commonRepository.GetUnAssignedUserByRoleId(roleId);
        }

        public Task<List<GetAllGroupTypesResponse>> GetAllGroupTypes()
        {
            return repositoryManager.commonRepository.GetAllGroupTypes();
        }

        public Task<List<GetAllTerritoriesResponse>> GetAllTerritories()
        {
            return repositoryManager.commonRepository.GetAllTerritories();
        }

        public Task<List<GetAllAddressTypesResponse>> GetAllAddressTypes()
        {
            return repositoryManager.commonRepository.GetAllAddressTypes();
        }

        public Task<List<GetAllCountriesResponse>> GetAllCountries()
        {
            return repositoryManager.commonRepository.GetAllCountries();
        }

        public Task<List<GetAllStatesResponse>> GetAllStates()
        {
            return repositoryManager.commonRepository.GetAllStates();
        }

        public Task<List<GetAllCitiesResponse>> GetAllCities(int stateId)
        {
            return repositoryManager.commonRepository.GetAllCities(stateId);
        }

        public Task<List<GetAllContactTypesResponse>> GetAllContactTypes()
        {
            return repositoryManager.commonRepository.GetAllContactTypes();
        }

        public Task<List<GetAllDocumentTypesResponse>> GetAllDocumentTypes()
        {
            return repositoryManager.commonRepository.GetAllDocumentTypes();
        }
        public Task<List<GetAllPaymentTermsResponse>> GetAllPaymentTerms()
        {
            return repositoryManager.commonRepository.GetAllPaymentTerms();
        }
        public Task<List<GetAllPaymentMethodResponse>> GetAllPaymentMethod()
        {
            return repositoryManager.commonRepository.GetAllPaymentMethod();
        }
        public Task<List<GetAllSupplierTypeResponse>> GetAllSupplierType()
        {
            return repositoryManager.commonRepository.GetAllSupplierType();
        }

        public Task<List<GetAllDeliveryCarriersResponse>> GetAllDeliveryCarriers()
        {
            return repositoryManager.commonRepository.GetAllDeliveryCarriers();
        }
        public Task<List<GetAllDeliveryMethodsResponse>> GetAllDeliveryMethods()
        {
            return repositoryManager.commonRepository.GetAllDeliveryMethods();
        }
        public Task<List<GetAllDeliveryAccountsResponse>> GetAllDeliveryAccounts()
        {
            return repositoryManager.commonRepository.GetAllDeliveryAccounts();
        }
        public Task<List<GetAllPhoneTypesResponse>> GetAllPhoneTypes()
        {
            return repositoryManager.commonRepository.GetAllPhoneTypes();
        }
        public Task<List<GetAllUserResponse>> GetAllUser()
        {
            return repositoryManager.commonRepository.GetAllUser();
        }

        public Task<List<GetEventNameAndUserNameByCustomerIdResponse>> GetEventNameAndUserNameByCustomerId(int customerId)
        {
            return repositoryManager.commonRepository.GetEventNameAndUserNameByCustomerId(customerId);
        }
        public Task<List<GetEventNameAndUserNameBySupplierIdResponse>> GetEventNameAndUserNameBySupplierId(int supplierId)
        {
            return repositoryManager.commonRepository.GetEventNameAndUserNameBySupplierId(supplierId);
        }
        public Task<List<GetAllModulesResponse>> GetAllModules()
        {
            return repositoryManager.commonRepository.GetAllModules();
        }
        public Task<List<GetAllFunctionalitiesResponse>> GetAllFunctionalities(int moduleId)
        {
            return repositoryManager.commonRepository.GetAllFunctionalities(moduleId);
        }
        public Task<List<GetAllFunctionalitiesFieldsResponse>> GetAllFunctionalitiesFields(int functionalityId)
        {
            return repositoryManager.commonRepository.GetAllFunctionalitiesFields(functionalityId);
        }

        public async Task<AddEntityDTO<int>> UpdateResponsibleUser(UpdateResponsibleUserRequest requestData)
        {
            AddEntityDTO<int> responceData = new();
            responceData = await repositoryManager.commonRepository.UpdateResponsibleUser(requestData);
            return responceData;
        }

        public async Task<byte[]> DownloadDocument(string folderName, string fileName, int keyId)
        {
            byte[] decryptedBytes = null!;
            string AESKey = commonSettingService.EncryptionSettings.AESKey!;
            string AESIV = commonSettingService.EncryptionSettings.AESIV!;
            var contentPath = commonSettingService.ApplicationSettings.SaveFilePath;
            string filePath = Path.Combine(contentPath!, folderName, keyId.ToString(), fileName);

            if (File.Exists(filePath))
            {
                decryptedBytes = await FileManager.DownloadDecryptFile(filePath!, AESKey, AESIV);
            }
            return decryptedBytes!;
        }
        public Task<List<GetAllAPIProvidersResponse>> GetAllAPIProviders()
        {
            return repositoryManager.commonRepository.GetAllAPIProviders();
        }
        public Task<List<GetAllAPIEndpointsResponse>> GetAllAPIEndpoints()
        {
            return repositoryManager.commonRepository.GetAllAPIEndpoints();
        }
        public Task<List<GetAllApproveCustomerForLinkingResponse>> GetAllApproveCustomerForLinking(int customerId)
        {
            return repositoryManager.commonRepository.GetAllApproveCustomerForLinking(customerId);
        }
        public Task<List<GetAllPODeliveryMethodResponse>> GetAllPODeliveryMethod()
        {
            return repositoryManager.commonRepository.GetAllPODeliveryMethod();
        }
        public Task<List<GetAllApiEventParameterByApiEventIdResponse>> GetAllApiEventParameterByApiEventId(int apiEventId)
        {
            return repositoryManager.commonRepository.GetAllApiEventParameterByApiEventId(apiEventId);
        }
        public Task<List<GetAllAPIParametersResponse>> GetAllAPIParameters()
        {
            return repositoryManager.commonRepository.GetAllAPIParameters();
        }
    }
}