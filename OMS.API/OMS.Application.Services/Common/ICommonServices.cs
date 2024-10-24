﻿using OMS.Domain.Entities.API.Request.Common;
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
        Task<List<GetAllCitiesResponse>> GetAllCities(int stateId);
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
        Task<AddEntityDto<int>> UpdateResponsibleUser(UpdateResponsibleUserRequest requestData);
        Task<byte[]> DownloadDocument(string folderName, string fileName, int keyId);
        Task<List<GetAllAPIProvidersResponse>> GetAllAPIProviders();
        Task<List<GetAllAPIEndpointsResponse>> GetAllAPIEndpoints();
        Task<List<GetAllApproveCustomerForLinkingResponse>> GetAllApproveCustomerForLinking(int customerId);
        Task<List<GetAllPODeliveryMethodResponse>> GetAllPODeliveryMethod();
        Task<List<GetAllApiEventParameterByApiEventIdResponse>> GetAllApiEventParameterByApiEventId(int apiEventId);
        Task<List<GetAllAPIParametersResponse>> GetAllAPIParameters();
        Task<List<GetAllApiEventRequiredFieldByApiEventIdResponse>> GetAllApiEventRequiredFieldByApiEventId(int apiEventId);
        Task<List<GetAllCustomerResponse>> GetAllCustomers();
        Task<List<GetAllSubCustomerByCustomerIdResponse>> GetAllSubCustomerByCustomerId(int customerId);
        Task<List<GetAllAddressesByCustomerIdAndAddressTypeIdResponse>> GetAllAddressesByCustomerIdAndAddressTypeId(int customerId, short addressTypeId);
        Task<List<GetAllContactsByCustomerIdAndContactTypeIdResponse>> GetAllContactsByCustomerIdAndContactTypeId(int customerId, short contactTypeId);
        Task<List<GetAllOrderMethodResponse>> GetAllOrderMethod();
        Task<List<GetAllIncotermResponse>> GetAllIncoterm();
        Task<List<GetAllDocumentByOwnerIdResponse>> GetAllDocumentByOwnerId(int ownerId, short ownerType);
        Task<List<GetAllFunctionalityEventByFunctionalityIdResponse>> GetAllFunctionalityEventByFunctionalityId(int functionalityId);
        Task<List<GetNotesHistoryResponse>> GetNotesHistory(int entityId, int ownerId, byte ownerTypeId, string noteType);
        Task<List<GetAllFunctionalityEventByFunctionalityIdResponse>> GetAllFunctionalityEventByModuleId(int moduleId);
        Task<List<GetAllModulesWithPendingRequestCountResponse>> GetAllModulesWithPendingRequestCount(bool isPending);
        Task<List<GetUnAssignedSnippetByEmailTemplateIdResponse>> GetUnAssignedSnippetByEmailTemplateId(int emailTemplateId);
    }
}
