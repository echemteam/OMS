using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Collections.Generic;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class CommonRepository : BaseRepository<CommonEntity>, ICommonRepository
    {
        #region SP Name 
        const string GETALLROLES = "GetAllRoles";
        const string GETUNASSIGNEDUSERBYROLEID = "GetUnAssignedUserByRoleId";
        const string GETALLGROUPTYPES = "GetAllGroupTypes";
        const string GETALLTERRITORIES = "GetAllTerritories";
        const string GETALLCOUNTRIES = "GetAllCountries";
        const string GETALLSTATES = "GetAllStates";
        const string GETALLCITIES = "GetAllCities";
        const string GETALLCONTACTTYPES = "GetAllContactTypes";
        const string GETALLADDRESSTYPES = "GetAllAddressTypes";
        const string GETALLDOCUMENTTYPES = "GetAllDocumentTypes";
        const string GETALLDEFAULTPAYMENTTEMPLETE = "GetDefaultPaymentTemplete";
        const string GETALLPAYMENTMETHOD = "GetAllPaymentMethod";
        #endregion

        public CommonRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<List<GetAllRolesResponse>> GetAllRoles()
        {
            return await _context.GetList<GetAllRolesResponse>(GETALLROLES, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetUnAssignedUserByRoleIdResponse>> GetUnAssignedUserByRoleId(byte roleId)
        {
            List<GetUnAssignedUserByRoleIdResponse> getAllUsersResponse =await _context.GetList<GetUnAssignedUserByRoleIdResponse>(GETUNASSIGNEDUSERBYROLEID, new
            {
                roleId
            }, commandType: CommandType.StoredProcedure);
            return getAllUsersResponse;
        }

        public async Task<List<GetAllGroupTypesResponse>> GetAllGroupTypes()
        {
            return await _context.GetList<GetAllGroupTypesResponse>(GETALLGROUPTYPES, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllTerritoriesResponse>> GetAllTerritories()
        {
            return await _context.GetList<GetAllTerritoriesResponse>(GETALLTERRITORIES, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllAddressTypesResponse>> GetAllAddressTypes()
        {
            return await _context.GetList<GetAllAddressTypesResponse>(GETALLADDRESSTYPES, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllCountriesResponse>> GetAllCountries()
        {
            return await _context.GetList<GetAllCountriesResponse>(GETALLCOUNTRIES, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllStatesResponse>> GetAllStates()
        {
            return await _context.GetList<GetAllStatesResponse>(GETALLSTATES, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllCitiesResponse>> GetAllCities()
        {
            return await _context.GetList<GetAllCitiesResponse>(GETALLCITIES, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllContactTypesResponse>> GetAllContactTypes()
        {
            return await _context.GetList<GetAllContactTypesResponse>(GETALLCONTACTTYPES, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllDocumentTypesResponse>> GetAllDocumentTypes()
        {
            return await _context.GetList<GetAllDocumentTypesResponse>(GETALLDOCUMENTTYPES, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllPaymentTermsResponse>> GetAllPaymentTerms()
        {
            return await _context.GetList<GetAllPaymentTermsResponse>(GETALLDEFAULTPAYMENTTEMPLETE, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllPaymentMethodResponse>> GetAllPaymentMethod()
        {
            return await _context.GetList<GetAllPaymentMethodResponse>(GETALLPAYMENTMETHOD, commandType: CommandType.StoredProcedure);
        }


    }
}
