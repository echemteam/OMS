﻿using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Repository;
using OMS.Prisitance.Entities.Entities;
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

        public Task<List<GetAllCitiesResponse>> GetAllCities()
        {
            return repositoryManager.commonRepository.GetAllCities();
        }

        public Task<List<GetAllContactTypesResponse>> GetAllContactTypes()
        {
            return repositoryManager.commonRepository.GetAllContactTypes();
        }
    }
}
