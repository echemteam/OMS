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
    }
}
