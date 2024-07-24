﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OMS.Application.Services;
using OMS.Framework;
using OMS.Shared.Services.Contract;

namespace OMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SupplierAccoutingSettingController : BaseController
    {
        #region Private Variable
        private IServiceManager _serviceManager { get; }
        #endregion

        #region Constructor
        public SupplierAccoutingSettingController(ICommonSettingService commonSettingService, IServiceManager serviceManager) : base(commonSettingService)
        {
            _serviceManager = serviceManager;
        }
        #endregion
        #region Supplier Accouting Setting Controller API
        #endregion

    }
}