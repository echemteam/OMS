using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Customers
{
    public class CustomersServices : BaseServices, ICustomersServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public CustomersServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Customers Services
        public async Task<AddEntityDTO<int>> AddCustomersBasicInformation(AddCustomersBasicInformationRequest requestData, short CurrentUserId)
        {
            CustomersDTO customersDTO = requestData.ToMapp<AddCustomersBasicInformationRequest, CustomersDTO>();
            customersDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.customers.AddCustomersBasicInformation(customersDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData, short CurrentUserId)
        {
            CustomersDTO customersDTO = requestData.ToMapp<UpdateCustomersBasicInformationRequest, CustomersDTO>();
            customersDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.customers.UpdateCustomersBasicInformation(customersDTO);
        }

        public async Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int customerId)
        {
            return await repositoryManager.customers.GetCustomersBasicInformationById(customerId);
        }
        public async Task<EntityList<GetCustomersResponse>> GetCustomers(GetCustomersRequest queryRequest)
        {
            var customersDetails = await repositoryManager.customers.GetCustomers(queryRequest);
            return customersDetails!;
        }

        public async Task<AddEntityDTO<int>> CheckCustomerNameExist(CheckCustomerNameExistRequest requestData)
        {
            CustomersDTO customersDTO = requestData.ToMapp<CheckCustomerNameExistRequest, CustomersDTO>();
            return await repositoryManager.customers.CheckCustomerNameExist(customersDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomerApproveStatus(UpdateCustomerApproveStatusRequest requestData)
        {
            CustomersDTO customersDTO = requestData.ToMapp<UpdateCustomerApproveStatusRequest, CustomersDTO>();
            return await repositoryManager.customers.UpdateCustomerApproveStatus(customersDTO);
        }
        #endregion
    }
}
