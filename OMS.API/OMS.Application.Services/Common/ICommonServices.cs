using OMS.Domain.Entities.API.Response.Common;

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

    }
}
