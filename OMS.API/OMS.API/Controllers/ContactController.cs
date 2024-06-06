﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Response.Address;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContactController : BaseController
    {
        #region private variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public ContactController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion

        #region Contact API

        [HttpPost("AddContact")]
        public async Task<IActionResult> AddContact(AddContactRequest requestData)
        {

            var addItem = await _serviceManager.contactService.AddContact(requestData, CurrentUserId);
            return APISucessResponce(addItem);
        }


        [HttpGet("GetContactByCustomerIdId")]
        public async Task<IActionResult> GetContactByCustomerIdId(int customerId)
        {
            List<GetContactByCustomerIdResponse> responseData = await _serviceManager.contactService.GetContactByCustomerIdId(customerId).ConfigureAwait(true);
            return APISucessResponce(responseData);
        }

        //[HttpPost("AddEmail")]
        //public async Task<IActionResult> AddEmail(AddEmailRequest requestData)
        //{
        //    var addItem = await _serviceManager.contactService.AddEmail(requestData, CurrentUserId);
        //    return APISucessResponce(addItem);
        //}

        //[HttpPost("AddPhone")]
        //public async Task<IActionResult> AddPhone(AddPhoneRequest requestData)
        //{

        //    var addItem = await _serviceManager.contactService.AddPhone(requestData, CurrentUserId);
        //    return APISucessResponce(addItem);
        //}
        #endregion

    }
}
