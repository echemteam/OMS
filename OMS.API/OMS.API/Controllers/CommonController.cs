using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Response.Common;
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
    }
}
