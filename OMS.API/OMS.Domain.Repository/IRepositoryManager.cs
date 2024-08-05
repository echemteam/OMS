using OMS.Domain.Repository.Contract;
using OMS.Domain.Repository.Implementation;

namespace OMS.Domain.Repository
{
    public interface IRepositoryManager
    {
        ITestRepository test { get; }
        IAuthenticationRepository authentication { get; }
        IUserRepository user { get; }
        IRolesRepository roles { get; }
        IRolesMappingRepository rolesMapping { get; }
        ISecurityPermissionRepository securityPermission { get; }
        ICommonRepository commonRepository { get; }
        ICustomersRepository customers { get; }
        IAddressRepository address { get; }
        IContactRepository contact { get; }
        ICustomerNotesRepository customerNotes { get; }
        ICustomerAccountingSettingsRepository customerAccountingSettings { get; }
        IEmailAddressRepository emailAddress { get; }
        IPhoneNumberRepository phoneNumber { get; }
        ICustomerDocumentsRepository customerDocuments { get; }
        ISupplierRepository supplier { get; }
        ISupplierdocuementsRepositery supplierdocuements { get; }
        ISupplierNotesRepository supplierNotes { get; }
        IApprovalRepository approval { get; }
        IApprovalConfigurationRepository approvalConfiguration { get; }
        IApiProviderRepository apiProvider { get; }
        IApiEndpointRepository apiEndpoint { get; }
        IApiParameterRepository apiParameter { get; }
        IApiAuthenticationRepository apiAuthentication { get; }
        IOrganizationRepository organization { get; }
        IOrganizationOtherSettingsRepository organizationOtherSettings { get; }
        ISmtpSettingsRepository smtpSettings { get; }
        IOrganizationContactDetailsRepository organizationContactDetails { get; }
        IOrganizationLogisticDetailsRepository organizationLogisticDetails { get; }
        IOrganizationBankDetailsRepository organizationBankDetails { get; }
        IOrganizationAccountingDetailsRepository organizationAccountingDetails { get; }
        IOrganizationShippingChargesRepository organizationShippingCharges { get; }
        IOrganizationOtherChargesRepository organizationOtherCharges { get; }
        IOrganizationBusinessAddressesRepository organizationBusinessAddresses { get; }
        ISupplierFinancialSettingsRepository supplierFinancialSettings { get; }
        ISuppierBankDetailsRepository suppierBankDetails { get; }
        ISupplierPaymentSettingsRepository supplierPaymentSettings { get; }
        IApiEventRepository apiEvent { get; }
        IApiEventMappingRepository apiEventMapping { get; }
        IApiEventParameterRepository apiEventParameter { get; }
        IApiParameterMappingRepository apiParameterMapping { get; }
        IApiEventRequiredFieldRepository apiEventRequiredField { get; }
        IApiEventRequiredFieldsMappingRepository apiEventRequiredFieldsMapping { get; }
        IFunctionalitiesRepository functionalities { get; }
    }
}
