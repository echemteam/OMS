﻿using ClientIPAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Snippet;
using OMS.Domain.Entities.API.Response.Snippet;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [CheckClientIpActionFilter]
    public class SnippetController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public SnippetController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Snippet API
        [HttpPost("AddSnippet")]
        public async Task<IActionResult> AddSnippet(AddSnippetRequest requestData)
        {

            var addItem = await _serviceManager.snippetServices.AddSnippet(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }

        [HttpPost("UpdateSnippet")]
        public async Task<IActionResult> UpdateSnippet(UpdateSnippetRequest requestData)
        {
            AddEntityDto<int> responseData = new();
            if (requestData != null)
            {
                responseData = await _serviceManager.snippetServices.UpdateSnippet(requestData, CurrentUserId);
                return APISucessResponce(responseData);
            }
            return APISucessResponce<object>(responseData);
        }

        [HttpDelete("DeleteSnippet")]
        public async Task<IActionResult> DeleteSnippet(byte snippetId)
        {
            if (snippetId > 0)
            {
                short deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.snippetServices.DeleteSnippet(snippetId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(snippetId);
        }

        [HttpPost("GetSnippets")]
        public async Task<IActionResult> GetSnippets([FromBody] ListEntityRequest<BaseFilter> requestData)
        {
            var snippetsList = await _serviceManager.snippetServices.GetSnippets(requestData);
            return APISucessResponce<object>(snippetsList);
        }

        [HttpGet("GetSnippetsBySnippetId")]
        public async Task<IActionResult> GetSnippetsBySnippetId(byte snippetId)
        {
            if (snippetId > 0)
            {
                var snippet = await _serviceManager.snippetServices.GetSnippetsBySnippetId(snippetId).ConfigureAwait(true);
                return APISucessResponce<object>(snippet);
            }
            return APISucessResponce(snippetId);
        }
        [HttpDelete("DeleteAssignedSnippetBySnippetEmailTemplateId")]
        public async Task<IActionResult> DeleteAssignedSnippetBySnippetEmailTemplateId(int snippetEmailTemplateId)
        {
            if (snippetEmailTemplateId > 0)
            {
                short deletedBy = CurrentUserId;
                var deleteItem = await _serviceManager.snippetServices.DeleteAssignedSnippetBySnippetEmailTemplateId(snippetEmailTemplateId, deletedBy).ConfigureAwait(true);
                return APISucessResponce<object>(deleteItem);
            }
            return APISucessResponce(snippetEmailTemplateId);
        }
        [HttpPost("AddAssignedSnippet")]
        public async Task<IActionResult> AddAssignedSnippet(AddAssignedSnippetRequest requestData)
        {

            var addItem = await _serviceManager.snippetServices.AddAssignedSnippet(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }
        [HttpPost("GetAssignedSnippetByEmailTemplateId")]
        public async Task<IActionResult> GetAssignedSnippetByEmailTemplateId(GetAssignedSnippetByEmailTemplateIdRequest requestData)
        {
            var getAssignedSnippetByEmailTemplate = await _serviceManager.snippetServices.GetAssignedSnippetByEmailTemplateId(requestData);
            return APISucessResponce<object>(getAssignedSnippetByEmailTemplate);
        }
        #endregion
    }
}
