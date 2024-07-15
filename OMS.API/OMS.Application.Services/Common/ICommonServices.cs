using OMS.Domain.Entities.API.Request.Common;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Common
{
    public interface ICommonServices
    {
        Task<List<GetAllRolesResponse>> GetAllRoles();
        Task<List<GetUnAssignedUserByRoleIdResponse>> GetUnAssignedUserByRoleId(byte roleId);
        Task<List<GetAllGroupTypesResponse>> GetAllGroupTypes();
        Task<List<GetAllTerritoriesResponse>> GetAllTerritories();
        Task<List<GetAllCountriesResponse>> GetAllCountries();
        Task<List<GetAllStatesResponse>> GetAllStates();
        Task<List<GetAllCitiesResponse>> GetAllCities();
        Task<List<GetAllContactTypesResponse>> GetAllContactTypes();
        Task<List<GetAllAddressTypesResponse>> GetAllAddressTypes();
        Task<List<GetAllDocumentTypesResponse>> GetAllDocumentTypes();
        Task<List<GetAllPaymentTermsResponse>> GetAllPaymentTerms();
        Task<List<GetAllPaymentMethodResponse>> GetAllPaymentMethod();
        Task<List<GetAllSupplierTypeResponse>> GetAllSupplierType();
        Task<List<GetAllDeliveryCarriersResponse>> GetAllDeliveryCarriers();
        Task<List<GetAllDeliveryMethodsResponse>> GetAllDeliveryMethods();
        Task<List<GetAllDeliveryAccountsResponse>> GetAllDeliveryAccounts();
        Task<List<GetAllPhoneTypesResponse>> GetAllPhoneTypes();
        Task<List<GetAllUserResponse>> GetAllUser();
        Task<List<GetEventNameAndUserNameByCustomerIdResponse>> GetEventNameAndUserNameByCustomerId(int customerId);
        Task<List<GetEventNameAndUserNameBySupplierIdResponse>> GetEventNameAndUserNameBySupplierId(int supplierId);
        Task<List<GetAllModulesResponse>> GetAllModules();
        Task<List<GetAllFunctionalitiesResponse>> GetAllFunctionalities(int moduleId);
        Task<List<GetAllFunctionalitiesFieldsResponse>> GetAllFunctionalitiesFields(int functionalityId);
        Task<AddEntityDTO<int>> UpdateResponsibleUser(UpdateResponsibleUserRequest requestData);
        Task<byte[]> DownloadDocument(string folderName, string fileName, int keyId);
        Task<List<GetAllAPIProvidersResponse>> GetAllAPIProviders();
    }
}
