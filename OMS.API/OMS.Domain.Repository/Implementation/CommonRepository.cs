using OMS.Domain.Entities.API.Request.Common;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Entities.API.Response.User;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
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
        const string GETALLSUPPLIERTYPE = "GetAllSupplierType";
        const string GETALLDELIVERYCARRIERS = "GetAllDeliveryCarriers";
        const string GETALLDELIVERYMETHODS = "GetAllDeliveryMethods";
        const string GETALLDELIVERYACCOUNTS = "GetAllDeliveryAccounts";
        const string GETALLPHONETYPES = "GetAllPhoneTypes";
        const string GETALLUSER = "GetAllUser";
        const string GETEVENTNAMEANDUSERNAMEBYCUSTOMERID = "GetEventNameAndUserNameByCustomerId";
        const string GETEVENTNAMEANDUSERNAMEBYSUPPLIERID = "GetEventNameAndUserNameBySupplierId";
        const string GETALLMODULES = "GetAllModules";
        const string GETALLFUNCTIONALITIES = "GetAllFunctionalities";
        const string GETALLFUNCTIONALITIESFIELDS = "GetAllFunctionalitiesFields";
        const string UPDATERESPONSIBLEUSER = "UpdateResponsibleUser";
        const string GETALLAPIPROVIDERS = "GetAllAPIProviders";
        const string GETALLAPIENDPOINTS = "GetAllAPIEndpoints";
        const string GETALLAPPROVECUSTOMERFORLINKING = "GetAllApproveCustomerForLinking";
        const string GETALLPODELIVERYMETHOD = "GetAllPODeliveryMethod";
        const string GETALLAPIEVENTPARAMETERBYAPIEVENTID = "GetAllApiEventParameterByApiEventId";
        const string GETALLAPIPARAMETERS = "GetAllAPIParameters";
        const string GETALLAPIEVENTREQUIREDFIELDBYAPIEVENTID = "GetAllApiEventRequiredFieldByApiEventId";
        const string GETALLCUSTOMERS = "GetAllCustomers";
        const string GETALLSUBCUSTOMERBYCUSTOMERID = "GetAllSubCustomerByCustomerId";
        const string GETALLADDRESSESBYCUSTOMERIDANDADDRESSTYPEID = "GetAllAddressesByCustomerIdAndAddressTypeId";
        const string GETALLCONTACTSBYCUSTOMERIDANDCONTACTTYPEID = "GetAllContactsByCustomerIdAndContactTypeId";
        const string GETALLORDERMETHOD = "GetAllOrderMethod";
        const string GETALLINCOTERM = "GetAllIncoterm";
        const string GETALLDOCUMENTBYOWNERID = "GetAllDocumentByOwnerId";
        const string GETALLFUNCTIONALITYEVENTBYFUNCTIONALITYID = "GetAllFunctionalityEventByFunctionalityId";
        const string GETNOTESHISTORY = "GetNotesHistory";
        const string GETALLFUNCTIONALITYEVENTBYMODULEID = "GetAllFunctionalityEventByModuleId";
        const string GETALLMODULESWITHPENDINGREQUESTCOUNT = "GetAllModulesWithPendingRequestCount";
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
            List<GetUnAssignedUserByRoleIdResponse> getAllUsersResponse = await _context.GetList<GetUnAssignedUserByRoleIdResponse>(GETUNASSIGNEDUSERBYROLEID, new
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

        public async Task<List<GetAllCitiesResponse>> GetAllCities(int stateId)
        {
            List<GetAllCitiesResponse> getAllCitiesResponse = await _context.GetList<GetAllCitiesResponse>(GETALLCITIES, new
            {
                stateId
            }, commandType: CommandType.StoredProcedure);
            return getAllCitiesResponse;
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

        public async Task<List<GetAllSupplierTypeResponse>> GetAllSupplierType()
        {
            return await _context.GetList<GetAllSupplierTypeResponse>(GETALLSUPPLIERTYPE, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllDeliveryCarriersResponse>> GetAllDeliveryCarriers()
        {
            return await _context.GetList<GetAllDeliveryCarriersResponse>(GETALLDELIVERYCARRIERS, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllDeliveryMethodsResponse>> GetAllDeliveryMethods()
        {
            return await _context.GetList<GetAllDeliveryMethodsResponse>(GETALLDELIVERYMETHODS, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllDeliveryAccountsResponse>> GetAllDeliveryAccounts()
        {
            return await _context.GetList<GetAllDeliveryAccountsResponse>(GETALLDELIVERYACCOUNTS, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllPhoneTypesResponse>> GetAllPhoneTypes()
        {
            return await _context.GetList<GetAllPhoneTypesResponse>(GETALLPHONETYPES, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllUserResponse>> GetAllUser()
        {
            return await _context.GetList<GetAllUserResponse>(GETALLUSER, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetEventNameAndUserNameByCustomerIdResponse>> GetEventNameAndUserNameByCustomerId(int customerId)
        {
            List<GetEventNameAndUserNameByCustomerIdResponse> getEventNameAndUserNameByCustomerIdResponse = await _context.GetList<GetEventNameAndUserNameByCustomerIdResponse>(GETEVENTNAMEANDUSERNAMEBYCUSTOMERID, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getEventNameAndUserNameByCustomerIdResponse;
        }

        public async Task<List<GetEventNameAndUserNameBySupplierIdResponse>> GetEventNameAndUserNameBySupplierId(int supplierId)
        {
            List<GetEventNameAndUserNameBySupplierIdResponse> getEventNameAndUserNameBySupplierIdResponse = await _context.GetList<GetEventNameAndUserNameBySupplierIdResponse>(GETEVENTNAMEANDUSERNAMEBYSUPPLIERID, new
            {
                supplierId
            }, commandType: CommandType.StoredProcedure);
            return getEventNameAndUserNameBySupplierIdResponse;
        }

        public async Task<List<GetAllModulesResponse>> GetAllModules()
        {
            return await _context.GetList<GetAllModulesResponse>(GETALLMODULES, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllFunctionalitiesResponse>> GetAllFunctionalities(int moduleId)
        {
            List<GetAllFunctionalitiesResponse> getEventNameAndUserNameBySupplierIdResponse = await _context.GetList<GetAllFunctionalitiesResponse>(GETALLFUNCTIONALITIES, new
            {
                moduleId
            }, commandType: CommandType.StoredProcedure);
            return getEventNameAndUserNameBySupplierIdResponse;
        }
        public async Task<List<GetAllFunctionalitiesFieldsResponse>> GetAllFunctionalitiesFields(int functionalityId)
        {
            List<GetAllFunctionalitiesFieldsResponse> getAllFunctionalitiesFieldsResponse = await _context.GetList<GetAllFunctionalitiesFieldsResponse>(GETALLFUNCTIONALITIESFIELDS, new
            {
                functionalityId
            }, commandType: CommandType.StoredProcedure);
            return getAllFunctionalitiesFieldsResponse;
        }
        public async Task<AddEntityDto<int>> UpdateResponsibleUser(UpdateResponsibleUserRequest requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATERESPONSIBLEUSER, new
            {
                requestData.OwnerId,
                requestData.OwnerType,
                requestData.ResponsibleUserId
            }, CommandType.StoredProcedure);
        }
        public async Task<List<GetAllAPIProvidersResponse>> GetAllAPIProviders()
        {
            return await _context.GetList<GetAllAPIProvidersResponse>(GETALLAPIPROVIDERS, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllAPIEndpointsResponse>> GetAllAPIEndpoints()
        {
            return await _context.GetList<GetAllAPIEndpointsResponse>(GETALLAPIENDPOINTS, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllApproveCustomerForLinkingResponse>> GetAllApproveCustomerForLinking(int customerId)
        {
            List<GetAllApproveCustomerForLinkingResponse> getAllApproveCustomerForLinkingResponse = await _context.GetList<GetAllApproveCustomerForLinkingResponse>(GETALLAPPROVECUSTOMERFORLINKING, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getAllApproveCustomerForLinkingResponse;
        }
        public async Task<List<GetAllPODeliveryMethodResponse>> GetAllPODeliveryMethod()
        {
            return await _context.GetList<GetAllPODeliveryMethodResponse>(GETALLPODELIVERYMETHOD, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllApiEventParameterByApiEventIdResponse>> GetAllApiEventParameterByApiEventId(int apiEventId)
        {
            List<GetAllApiEventParameterByApiEventIdResponse> getAllApproveCustomerForLinkingResponse = await _context.GetList<GetAllApiEventParameterByApiEventIdResponse>(GETALLAPIEVENTPARAMETERBYAPIEVENTID, new
            {
                apiEventId
            }, commandType: CommandType.StoredProcedure);
            return getAllApproveCustomerForLinkingResponse;
        }
        public async Task<List<GetAllAPIParametersResponse>> GetAllAPIParameters()
        {
            return await _context.GetList<GetAllAPIParametersResponse>(GETALLAPIPARAMETERS, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllApiEventRequiredFieldByApiEventIdResponse>> GetAllApiEventRequiredFieldByApiEventId(int apiEventId)
        {
            List<GetAllApiEventRequiredFieldByApiEventIdResponse> getAllApproveCustomerForLinkingResponse = await _context.GetList<GetAllApiEventRequiredFieldByApiEventIdResponse>(GETALLAPIEVENTREQUIREDFIELDBYAPIEVENTID, new
            {
                apiEventId
            }, commandType: CommandType.StoredProcedure);
            return getAllApproveCustomerForLinkingResponse;
        }
        public async Task<List<GetAllCustomerResponse>> GetAllCustomers()
        {
            return await _context.GetList<GetAllCustomerResponse>(GETALLCUSTOMERS, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllSubCustomerByCustomerIdResponse>> GetAllSubCustomerByCustomerId(int customerId)
        {
            List<GetAllSubCustomerByCustomerIdResponse> getOrderSubCustomerByCustomerIdResponse = await _context.GetList<GetAllSubCustomerByCustomerIdResponse>(GETALLSUBCUSTOMERBYCUSTOMERID, new
            {
                customerId
            }, commandType: CommandType.StoredProcedure);
            return getOrderSubCustomerByCustomerIdResponse;
        }
        public async Task<List<GetAllAddressesByCustomerIdAndAddressTypeIdResponse>> GetAllAddressesByCustomerIdAndAddressTypeId(int customerId, short addressTypeId)
        {
            List<GetAllAddressesByCustomerIdAndAddressTypeIdResponse> getAllAddressesByCustomerIdAndAddressTypeIdResponse = await _context.GetList<GetAllAddressesByCustomerIdAndAddressTypeIdResponse>(GETALLADDRESSESBYCUSTOMERIDANDADDRESSTYPEID, new
            {
                customerId,
                addressTypeId
            }, commandType: CommandType.StoredProcedure);
            return getAllAddressesByCustomerIdAndAddressTypeIdResponse;
        }
        public async Task<List<GetAllContactsByCustomerIdAndContactTypeIdResponse>> GetAllContactsByCustomerIdAndContactTypeId(int customerId, short contactTypeId)
        {
            List<GetAllContactsByCustomerIdAndContactTypeIdResponse> getAllContactsByCustomerIdAndContactTypeIdResponse = await _context.GetList<GetAllContactsByCustomerIdAndContactTypeIdResponse>(GETALLCONTACTSBYCUSTOMERIDANDCONTACTTYPEID, new
            {
                customerId,
                contactTypeId
            }, commandType: CommandType.StoredProcedure);
            return getAllContactsByCustomerIdAndContactTypeIdResponse;
        }
        public async Task<List<GetAllOrderMethodResponse>> GetAllOrderMethod()
        {
            return await _context.GetList<GetAllOrderMethodResponse>(GETALLORDERMETHOD, commandType: CommandType.StoredProcedure);
        }
        public async Task<List<GetAllIncotermResponse>> GetAllIncoterm()
        {
            return await _context.GetList<GetAllIncotermResponse>(GETALLINCOTERM, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<GetAllDocumentByOwnerIdResponse>> GetAllDocumentByOwnerId(int ownerId, short ownerType)
        {
            List<GetAllDocumentByOwnerIdResponse> getAllDocumentByOwnerIdResponse = await _context.GetList<GetAllDocumentByOwnerIdResponse>(GETALLDOCUMENTBYOWNERID, new
            {
                ownerId,
                ownerType
            }, commandType: CommandType.StoredProcedure);
            return getAllDocumentByOwnerIdResponse;
        }

        public async Task<List<GetAllFunctionalityEventByFunctionalityIdResponse>> GetAllFunctionalityEventByFunctionalityId(int functionalityId)
        {
            List<GetAllFunctionalityEventByFunctionalityIdResponse> getAllDocumentByOwnerIdResponse = await _context.GetList<GetAllFunctionalityEventByFunctionalityIdResponse>(GETALLFUNCTIONALITYEVENTBYFUNCTIONALITYID, new
            {
                functionalityId
            }, commandType: CommandType.StoredProcedure);
            return getAllDocumentByOwnerIdResponse;
        }
        public async Task<List<GetNotesHistoryResponse>> GetNotesHistory(int entityId, int ownerId, byte ownerTypeId, string noteType)
        {
            List<GetNotesHistoryResponse> getNotesHistoryResponse = await _context.GetList<GetNotesHistoryResponse>(GETNOTESHISTORY, new
            {
                entityId,
                ownerId,
                ownerTypeId,
                noteType
            }, commandType: CommandType.StoredProcedure);
            return getNotesHistoryResponse;
        }
        public async Task<List<GetAllFunctionalityEventByFunctionalityIdResponse>> GetAllFunctionalityEventByModuleId(int moduleId)
        {
            List<GetAllFunctionalityEventByFunctionalityIdResponse> getAllFunctionalityEventByFunctionalityIdResponse = await _context.GetList<GetAllFunctionalityEventByFunctionalityIdResponse>(GETALLFUNCTIONALITYEVENTBYMODULEID, new
            {
                moduleId
            }, commandType: CommandType.StoredProcedure);
            return getAllFunctionalityEventByFunctionalityIdResponse;
        }
        public async Task<List<GetAllModulesWithPendingRequestCountResponse>> GetAllModulesWithPendingRequestCount(bool isPending)
        {
            List<GetAllModulesWithPendingRequestCountResponse> getAllModulesWithPendingRequestCountResponse = await _context.GetList<GetAllModulesWithPendingRequestCountResponse>(GETALLMODULESWITHPENDINGREQUESTCOUNT, new
            {
                isPending
            }, commandType: CommandType.StoredProcedure);

            return getAllModulesWithPendingRequestCountResponse;
        }
    }
}
