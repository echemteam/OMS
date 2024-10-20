﻿using OMS.Application.Services.Address;
using OMS.Application.Services.APIConfiguration;
using OMS.Application.Services.ApiEventManagement;
using OMS.Application.Services.Approval;
using OMS.Application.Services.ApprovalConfiguration;
using OMS.Application.Services.Authentication;
using OMS.Application.Services.Common;
using OMS.Application.Services.Contact;
using OMS.Application.Services.CustomerAccountingSettings;
using OMS.Application.Services.CustomerDocuments;
using OMS.Application.Services.CustomerNotes;
using OMS.Application.Services.Customers;
using OMS.Application.Services.Dictionary;
using OMS.Application.Services.EmailAddress;
using OMS.Application.Services.EmailTemplates;
using OMS.Application.Services.Order;
using OMS.Application.Services.Organization;
using OMS.Application.Services.PhoneNumber;
using OMS.Application.Services.Roles;
using OMS.Application.Services.RolesMapping;
using OMS.Application.Services.Security;
using OMS.Application.Services.Snippet;
using OMS.Application.Services.Supplier;
using OMS.Application.Services.SupplierAccoutingSetting;
using OMS.Application.Services.SupplierDocuements;
using OMS.Application.Services.SupplierFinancialSettings;
using OMS.Application.Services.SupplierNotes;
using OMS.Application.Services.Test;
using OMS.Application.Services.User;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System.ComponentModel.Design;

namespace OMS.Application.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly ICommonSettingService _commonSettingService;

        public ServiceManager(IRepositoryManager repositoryManager, ICommonSettingService commonSettingService)
        {
            _repositoryManager = repositoryManager;
            _commonSettingService = commonSettingService;
        }

        ITestService? _testService;
        IAuthenticationService _authenticationService;
        IUserService? _userService;
        IRolesServices _rolesServices;
        IRolesMappingServices _rolesMappingServices;
        ISecurityServices _securityServices;
        ICommonServices _commonServices;
        ICustomersServices _customersServices;
        IAddressServices _addressServices;
        IContactService _contactService;
        ICustomerNotesService _customerNotesService;
        ICustomerAccoutingSettingsService _customerAccoutingSettingsService;
        IEmailAddressService _emailAddressService;
        IPhoneNumberService _phoneNumberService;
        ICustomerDocumentsService _customerDocumentsService;
        ISupplierServices _supplierServices;
        ISupplierDocuementsService _supplierDocuementsService;
        ISupplierNotesService _supplierNotesService;
        IApprovalService _approvalService;
        IApprovalConfigurationServices _approvalConfigurationServices;
        IApiConfigurationService _apiConfigurationService;
        IOrganizationService _organizationService;
        ISupplierFinancialSettingsService _supplierFinancialSettingsService;
        IApiEventManagementService _apiEventManagementService;
        IOrderServices _orderServices;
        IDictionaryServices _dictionaryServices;
        IEmailTemplatesService _emailTemplatesService;
        ISnippetServices _snippetServices;

        public ITestService testService
        {
            get
            {
                if (_testService == null)
                {
                    _testService = new TestService(_repositoryManager, _commonSettingService);
                }
                return _testService;

            }
        }

        public IAuthenticationService authenticationService
        {
            get
            {
                if (_authenticationService == null)
                {
                    _authenticationService = new AuthenticationService(_repositoryManager, _commonSettingService);
                }
                return _authenticationService;

            }
        }

        public IUserService userService
        {
            get
            {
                if (_userService == null)
                {
                    _userService = new UserService(_repositoryManager, _commonSettingService);
                }
                return _userService;

            }
        }
        public IRolesServices rolesServices
        {
            get
            {
                if (_userService == null)
                {
                    _rolesServices = new RolesServices(_repositoryManager, _commonSettingService);
                }
                return _rolesServices;

            }
        }

        public IRolesMappingServices rolesMappingServices
        {
            get
            {
                if (_rolesMappingServices == null)
                {
                    _rolesMappingServices = new RolesMappingServices(_repositoryManager, _commonSettingService);
                }
                return _rolesMappingServices;

            }
        }

        public ISecurityServices securityServices
        {
            get
            {
                if (_securityServices == null)
                {
                    _securityServices = new SecurityServices(_repositoryManager, _commonSettingService);
                }
                return _securityServices;

            }
        }

        public ICommonServices commonServices
        {
            get
            {
                if (_commonServices == null)
                {
                    _commonServices = new CommonServices(_repositoryManager, _commonSettingService);
                }
                return _commonServices;

            }
        }
        public ICustomersServices customersServices
        {
            get
            {
                if (_customersServices == null)
                {
                    _customersServices = new CustomersServices(_repositoryManager, _commonSettingService);
                }
                return _customersServices;

            }
        }

        public IAddressServices addressServices
        {
            get
            {
                if (_addressServices == null)
                {
                    _addressServices = new AddressServices(_repositoryManager, _commonSettingService);
                }
                return _addressServices;

            }
        }
        public IContactService contactService
        {
            get
            {
                if (_contactService == null)
                {
                    _contactService = new ContactService(_repositoryManager, _commonSettingService);
                }
                return _contactService;

            }
        }
        public ICustomerNotesService customerNotesService
        {
            get
            {
                if (_customerNotesService == null)
                {
                    _customerNotesService = new CustomerNotesService(_repositoryManager, _commonSettingService);
                }
                return _customerNotesService;

            }
        }
        public ICustomerAccoutingSettingsService customerAccoutingSettingsService
        {
            get
            {
                if (_customerAccoutingSettingsService == null)
                {
                    _customerAccoutingSettingsService = new CustomerAccountingSettingsService(_repositoryManager, _commonSettingService);
                }
                return _customerAccoutingSettingsService;
            }
        }

        public IEmailAddressService emailAddressService
        {
            get
            {
                if (_emailAddressService == null)
                {
                    _emailAddressService = new EmailAddressService(_repositoryManager, _commonSettingService);
                }
                return _emailAddressService;

            }
        }
        public IPhoneNumberService phoneNumberService
        {
            get
            {
                if (_phoneNumberService == null)
                {
                    _phoneNumberService = new PhoneNumberService(_repositoryManager, _commonSettingService);
                }
                return _phoneNumberService;

            }
        }

        public ICustomerDocumentsService customerDocumentsService
        {
            get
            {
                if (_customerDocumentsService == null)
                {
                    _customerDocumentsService = new CustomerDocumentsService(_repositoryManager, _commonSettingService);
                }
                return _customerDocumentsService;

            }
        }

        public ISupplierServices supplierServices
        {
            get
            {
                if (_supplierServices == null)
                {
                    _supplierServices = new SupplierServices(_repositoryManager, _commonSettingService);
                }
                return _supplierServices;

            }
        }
        public ISupplierDocuementsService supplierDocuementsService
        {
            get
            {
                if (_supplierDocuementsService == null)
                {
                    _supplierDocuementsService = new SupplierDocuementsService(_repositoryManager, _commonSettingService);
                }
                return _supplierDocuementsService;

            }
        }

        public ISupplierNotesService supplierNotesService
        {
            get
            {
                if (_supplierNotesService == null)
                {
                    _supplierNotesService = new SupplierNotesService(_repositoryManager, _commonSettingService);
                }
                return _supplierNotesService;

            }
        }
        public IApprovalService approvalService
        {
            get
            {
                if (_approvalService == null)
                {
                    _approvalService = new ApprovalService(_repositoryManager, _commonSettingService);
                }
                return _approvalService;

            }
        }
        public IApprovalConfigurationServices approvalConfigurationServices
        {
            get
            {
                if (_approvalConfigurationServices == null)
                {
                    _approvalConfigurationServices = new ApprovalConfigurationServices(_repositoryManager, _commonSettingService);
                }
                return _approvalConfigurationServices;

            }
        }

        public IApiConfigurationService apiConfigurationService
        {
            get
            {
                if (_apiConfigurationService == null)
                {
                    _apiConfigurationService = new ApiConfigurationService(_repositoryManager, _commonSettingService);
                }
                return _apiConfigurationService;

            }
        }
        public IOrganizationService organizationService
        {
            get
            {
                if (_organizationService == null)
                {
                    _organizationService = new OrganizationService(_repositoryManager, _commonSettingService);
                }
                return _organizationService;

            }
        }
        public ISupplierFinancialSettingsService supplierFinancialSettingsService
        {
            get
            {
                if (_supplierFinancialSettingsService == null)
                {
                    _supplierFinancialSettingsService = new SupplierFinancialSettingsService(_repositoryManager, _commonSettingService);
                }
                return _supplierFinancialSettingsService;

            }
        }
        public IApiEventManagementService apiEventManagementService
        {
            get
            {
                if (_apiEventManagementService == null)
                {
                    _apiEventManagementService = new ApiEventManagementService(_repositoryManager, _commonSettingService);
                }
                return _apiEventManagementService;

            }
        }
        public IOrderServices orderServices
        {
            get
            {
                if (_orderServices == null)
                {
                    _orderServices = new OrderServices(_repositoryManager, _commonSettingService);
                }
                return _orderServices;

            }
        }
        public IDictionaryServices dictionaryServices
        {
            get
            {
                if (_dictionaryServices == null)
                {
                    _dictionaryServices = new DictionaryServices(_repositoryManager, _commonSettingService);
                }
                return _dictionaryServices;

            }
        }
        public IEmailTemplatesService emailTemplatesService
        {
            get
            {
                if (_emailTemplatesService == null)
                {
                    _emailTemplatesService = new EmailTemplatesService(_repositoryManager, _commonSettingService);
                }
                return _emailTemplatesService;

            }
        }
        public ISnippetServices snippetServices
        {
            get
            {
                if (_snippetServices == null)
                {
                    _snippetServices = new SnippetServices(_repositoryManager, _commonSettingService);
                }
                return _snippetServices;

            }
        }
    }
}
