using OMS.Application.Services.Address;
using OMS.Application.Services.Authentication;
using OMS.Application.Services.Common;
using OMS.Application.Services.Contact;
using OMS.Application.Services.CustomerNotes;
using OMS.Application.Services.Customers;
using OMS.Application.Services.EmailAddress;
using OMS.Application.Services.PhoneNumber;
using OMS.Application.Services.Roles;
using OMS.Application.Services.RolesMapping;
using OMS.Application.Services.Security;
using OMS.Application.Services.Test;
using OMS.Application.Services.User;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

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
        IEmailAddressService _emailAddressService;
        IPhoneNumberService _phoneNumberService;

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

    }
}
