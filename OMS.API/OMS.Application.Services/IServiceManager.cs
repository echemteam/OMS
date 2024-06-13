﻿using OMS.Application.Services.Address;
using OMS.Application.Services.Authentication;
using OMS.Application.Services.Common;
using OMS.Application.Services.Contact;
using OMS.Application.Services.CustomerNotes;
using OMS.Application.Services.Customers;
using OMS.Application.Services.CustomerAccountingSettings;
using OMS.Application.Services.EmailAddress;
using OMS.Application.Services.PhoneNumber;
using OMS.Application.Services.Roles;
using OMS.Application.Services.RolesMapping;
using OMS.Application.Services.Security;
using OMS.Application.Services.Test;
using OMS.Application.Services.User;

namespace OMS.Application.Services
{
    public interface IServiceManager
    {
        ITestService testService { get; }
        IAuthenticationService authenticationService { get; }
        IUserService userService { get; }
        IRolesServices rolesServices { get; }
        IRolesMappingServices rolesMappingServices { get; }
        ISecurityServices securityServices { get; }
        ICommonServices commonServices { get; }
        ICustomersServices customersServices { get; }
        IAddressServices addressServices { get; }
        IContactService contactService { get; }
        ICustomerNotesService customerNotesService { get; }
        ICustomerAccoutingSettingsService customerAccoutingSettingsService { get; }
        IEmailAddressService emailAddressService { get; }
        IPhoneNumberService phoneNumberService { get; }
    }
}
