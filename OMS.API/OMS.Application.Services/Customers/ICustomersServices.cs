using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Customers
{
    public interface ICustomersServices
    {
        Task<AddEditResponse> AddEditCustomersBasicInformation(AddEditCustomersBasicInformationRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData, short CurrentUserId);
        Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int customerId);
        Task<EntityList<GetCustomersResponse>> GetCustomers(GetCustomersRequest queryRequest);
        Task<AddEntityDto<int>> CheckCustomerNameExist(CheckCustomerNameExistRequest requestData);
        Task<AddEntityDto<int>> UpdateCustomerApproveStatus(UpdateCustomerApproveStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateCustomerInActiveStatus(UpdateCustomerInActiveStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateCustomerStatus(UpdateCustomerStatusRequest requestData, short CurrentUserId);
        Task<EntityList<GetCustomerAuditHistoryByCustomerIdResponse>> GetCustomerAuditHistoryByCustomerId(GetCustomerAuditHistoryByCustomerIdRequest queryRequest);
        Task<List<GetCustomersDetailsByCutomerNameResponse>> GetCustomersDetailsByCutomerName(string customerName);
        Task<AddEntityDto<bool>> UpdateCustomerSubCustomer(UpdateCustomerSubCustomerRequest requestData);
        Task<AddEntityDto<int>> AddSubCustomer(AddSubCustomerRequest requestData);
        Task<EntityList<GetSubCustomerByCustomerIdResponse>> GetSubCustomerByCustomerId(GetSubCustomerByCustomerIdRequest requestData);
        Task<AddEntityDto<int>> DeleteSubCustomer(int subCustomerMainCustomerId, short CurrentUserId);
        Task<AddEntityDto<int>> AddEditResponsibleUserForCustomer(AddEditResponsibleUserForCustomerRequest requestData, short CurrentUserId);
        Task<List<GetSearchCustomersDetailsByNameEmailWebsiteResponse>> GetSearchCustomersDetailsByNameEmailWebsite(GetSearchCustomersDetailsByNameEmailWebsiteRequest requestData);
    }
}
