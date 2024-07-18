﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Common;
using OMS.Domain.Entities.API.Response.Common;
using OMS.Domain.Entities.API.Response.User;
using OMS.FileManger.Services;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommonController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public CommonController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        [HttpGet("GetAllRoles")]
        public async Task<IActionResult> GetAllRoles()
        {
            List<GetAllRolesResponse> responseData = await _serviceManager.commonServices.GetAllRoles().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetUnAssignedUserByRoleId")]
        public async Task<IActionResult> GetUnAssignedUserByRoleId(byte roleId)
        {
            List<GetUnAssignedUserByRoleIdResponse> responseData = await _serviceManager.commonServices.GetUnAssignedUserByRoleId(roleId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllGroupTypes")]
        public async Task<IActionResult> GetAllGroupTypes()
        {
            List<GetAllGroupTypesResponse> responseData = await _serviceManager.commonServices.GetAllGroupTypes().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllTerritories")]
        public async Task<IActionResult> GetAllTerritories()
        {
            List<GetAllTerritoriesResponse> responseData = await _serviceManager.commonServices.GetAllTerritories().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllAddressTypes")]
        public async Task<IActionResult> GetAllAddressTypes()
        {
            List<GetAllAddressTypesResponse> responseData = await _serviceManager.commonServices.GetAllAddressTypes().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllCountries")]
        public async Task<IActionResult> GetAllCountries()
        {
            List<GetAllCountriesResponse> responseData = await _serviceManager.commonServices.GetAllCountries().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllStates")]
        public async Task<IActionResult> GetAllStates()
        {
            List<GetAllStatesResponse> responseData = await _serviceManager.commonServices.GetAllStates().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllCities")]
        public async Task<IActionResult> GetAllCities()
        {
            List<GetAllCitiesResponse> responseData = await _serviceManager.commonServices.GetAllCities().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllContactTypes")]
        public async Task<IActionResult> GetAllContactTypes()
        {
            List<GetAllContactTypesResponse> responseData = await _serviceManager.commonServices.GetAllContactTypes().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllDocumentTypes")]
        public async Task<IActionResult> GetAllDocumentTypes()
        {
            List<GetAllDocumentTypesResponse> responseData = await _serviceManager.commonServices.GetAllDocumentTypes().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        [HttpGet("GetAllPaymentTerms")]
        public async Task<IActionResult> GetAllDefaultPaymentTemplete()
        {
            List<GetAllPaymentTermsResponse> responseData = await _serviceManager.commonServices.GetAllPaymentTerms().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllPaymentMethod")]
        public async Task<IActionResult> GetAllPaymentMethod()
        {
            List<GetAllPaymentMethodResponse> responseData = await _serviceManager.commonServices.GetAllPaymentMethod().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllSupplierType")]
        public async Task<IActionResult> GetAllSupplierType()
        {
            List<GetAllSupplierTypeResponse> responseData = await _serviceManager.commonServices.GetAllSupplierType().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllDeliveryCarriers")]
        public async Task<IActionResult> GetAllDeliveryCarriers()
        {
            List<GetAllDeliveryCarriersResponse> responseData = await _serviceManager.commonServices.GetAllDeliveryCarriers().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllDeliveryMethods")]
        public async Task<IActionResult> GetAllDeliveryMethods()
        {
            List<GetAllDeliveryMethodsResponse> responseData = await _serviceManager.commonServices.GetAllDeliveryMethods().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllDeliveryAccounts")]
        public async Task<IActionResult> GetAllDeliveryAccounts()
        {
            List<GetAllDeliveryAccountsResponse> responseData = await _serviceManager.commonServices.GetAllDeliveryAccounts().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllPhoneTypes")]
        public async Task<IActionResult> GetAllPhoneTypes()
        {
            List<GetAllPhoneTypesResponse> responseData = await _serviceManager.commonServices.GetAllPhoneTypes().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUser()
        {
            List<GetAllUserResponse> responseData = await _serviceManager.commonServices.GetAllUser().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetEventNameAndUserNameByCustomerId")]
        public async Task<IActionResult> GetEventNameAndUserNameByCustomerId(int customerId)
        {
            List<GetEventNameAndUserNameByCustomerIdResponse> responseData = await _serviceManager.commonServices.GetEventNameAndUserNameByCustomerId(customerId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetEventNameAndUserNameBySupplierId")]
        public async Task<IActionResult> GetEventNameAndUserNameBySupplierId(int supplierId)
        {
            List<GetEventNameAndUserNameBySupplierIdResponse> responseData = await _serviceManager.commonServices.GetEventNameAndUserNameBySupplierId(supplierId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllModules")]
        public async Task<IActionResult> GetAllModules()
        {
            List<GetAllModulesResponse> responseData = await _serviceManager.commonServices.GetAllModules().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllFunctionalities")]
        public async Task<IActionResult> GetAllFunctionalities(int moduleId)
        {
            List<GetAllFunctionalitiesResponse> responseData = await _serviceManager.commonServices.GetAllFunctionalities(moduleId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllFunctionalitiesFields")]
        public async Task<IActionResult> GetAllFunctionalitiesFields(int functionalityId)
        {
            List<GetAllFunctionalitiesFieldsResponse> responseData = await _serviceManager.commonServices.GetAllFunctionalitiesFields(functionalityId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpPost("UpdateResponsibleUser")]
        public async Task<IActionResult> UpdateResponsibleUser(UpdateResponsibleUserRequest requestData)
        {
            var updateItem = await _serviceManager.commonServices.UpdateResponsibleUser(requestData);
            return APISucessResponce(updateItem);
        }

        [HttpGet("DownloadDocument")]
        public async Task<IActionResult> DownloadDocument(string folderName, string fileName, int keyId)
        {

            byte[] decryptedBytes = await _serviceManager.commonServices.DownloadDocument(folderName, fileName, keyId);
            if (decryptedBytes != null)
            {
                var memory = new MemoryStream(decryptedBytes!)
                {
                    Position = 0
                };
                string ext = FileManager.GetExtension(fileName);
                string mimeType = FileManager.GetMimeType(ext);
                var contentType = mimeType;
                return File(memory, contentType, fileName);
            }
            return File("", "", fileName);
        }

        [HttpGet("GetAllAPIProviders")]
        public async Task<IActionResult> GetAllAPIProviders()
        {
            List<GetAllAPIProvidersResponse> responseData = await _serviceManager.commonServices.GetAllAPIProviders().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllAPIEndpoints")]
        public async Task<IActionResult> GetAllAPIEndpoints()
        {
            List<GetAllAPIEndpointsResponse> responseData = await _serviceManager.commonServices.GetAllAPIEndpoints().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        [HttpGet("GetAllSubCompany")]
        public async Task<IActionResult> GetAllSubCompany()
        {
            List<GetAllSubCompanyResponse> responseData = await _serviceManager.commonServices.GetAllSubCompany().ConfigureAwait(true);
            return APISucessResponce(responseData);
        }
    }
}
