using OMS.Application.Services.Address;
using OMS.Application.Services.APIConfiguration;
using OMS.Application.Services.Approval;
using OMS.Application.Services.ApprovalConfiguration;
using OMS.Application.Services.Authentication;
using OMS.Application.Services.Common;
using OMS.Application.Services.Contact;
using OMS.Application.Services.CustomerDocuments;
using OMS.Application.Services.CustomerNotes;
using OMS.Application.Services.Customers;
using OMS.Application.Services.EmailAddress;
using OMS.Application.Services.Organization;
using OMS.Application.Services.PhoneNumber;
using OMS.Application.Services.Roles;
using OMS.Application.Services.RolesMapping;
using OMS.Application.Services.Security;
using OMS.Application.Services.Supplier;
using OMS.Application.Services.SupplierAccoutingSetting;
using OMS.Application.Services.SupplierDocuements;
using OMS.Application.Services.SupplierNotes;
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
        ICustomerDocumentsService customerDocumentsService { get; }
        ISupplierServices supplierServices { get; }
        ISupplierDocuementsService supplierDocuementsService { get; }
        ISupplierNotesService supplierNotesService { get; }
        IApprovalService approvalService { get; }
        IApprovalConfigurationServices approvalConfigurationServices { get; }
        IApiConfigurationService apiConfigurationService { get; }
        IOrganizationService organizationService { get; }
        ISupplierFinancialSettingsService supplierFinancialSettingsService { get; }
    }
}
