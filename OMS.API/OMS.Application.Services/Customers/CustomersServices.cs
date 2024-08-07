using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
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
        public async Task<AddEditResponse> AddEditCustomersBasicInformation(AddEditCustomersBasicInformationRequest requestData, short CurrentUserId)
        {
            CustomersDto customersDto = requestData.ToMapp<AddEditCustomersBasicInformationRequest, CustomersDto>();
            customersDto.CreatedBy = CurrentUserId;
            AddEditResponse responseData = await repositoryManager.customers.AddEditCustomersBasicInformation(customersDto);

            if (!string.IsNullOrEmpty(requestData.Note) && responseData.KeyValue > 0)
            {
                _ = new AddEntityDto<long>();
                CustomerNotesDto customerNotes = new()
                {
                    CustomerNoteId = requestData.CustomerNoteId,
                    Note = requestData.Note,
                    CustomerId = responseData.KeyValue,
                    CreatedBy = CurrentUserId
                };
                AddEntityDto<long> addEntityDto;
                if (requestData.CustomerNoteId > 0)
                {
                    // Update existing customer note
                    customerNotes.UpdatedBy = CurrentUserId;
                    addEntityDto = await repositoryManager.customerNotes.UpdateCustomerNotes(customerNotes);
                    responseData.NoteId = addEntityDto.KeyValue;
                }
                else
                {
                    // Add new customer note
                    addEntityDto = await repositoryManager.customerNotes.AddCustomerNotes(customerNotes);
                    responseData.NoteId = addEntityDto.KeyValue;
                }
            }
            return responseData;
        }

        public async Task<AddEntityDto<int>> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData, short CurrentUserId)
        {
            CustomersDto customersDto = requestData.ToMapp<UpdateCustomersBasicInformationRequest, CustomersDto>();
            customersDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.customers.UpdateCustomersBasicInformation(customersDto);
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

        public async Task<AddEntityDto<int>> CheckCustomerNameExist(CheckCustomerNameExistRequest requestData)
        {
            CustomersDto customersDto = requestData.ToMapp<CheckCustomerNameExistRequest, CustomersDto>();
            return await repositoryManager.customers.CheckCustomerNameExist(customersDto);
        }

        public async Task<AddEntityDto<int>> UpdateCustomerApproveStatus(UpdateCustomerApproveStatusRequest requestData, short CurrentUserId)
        {
            CustomersDto customersDto = requestData.ToMapp<UpdateCustomerApproveStatusRequest, CustomersDto>();
            customersDto.ApprovedBy = CurrentUserId;
            return await repositoryManager.customers.UpdateCustomerApproveStatus(customersDto);
        }

        public async Task<AddEntityDto<int>> UpdateCustomerInActiveStatus(UpdateCustomerInActiveStatusRequest requestData, short CurrentUserId)
        {
            CustomersDto customersDto = requestData.ToMapp<UpdateCustomerInActiveStatusRequest, CustomersDto>();
            customersDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.customers.UpdateCustomerInActiveStatus(customersDto);
        }

        public async Task<AddEntityDto<int>> UpdateCustomerStatus(UpdateCustomerStatusRequest requestData, short CurrentUserId)
        {
            CustomersDto customersDto = requestData.ToMapp<UpdateCustomerStatusRequest, CustomersDto>();
            customersDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.customers.UpdateCustomerStatus(customersDto);
        }

        public async Task<EntityList<GetCustomerAuditHistoryByCustomerIdResponse>> GetCustomerAuditHistoryByCustomerId(GetCustomerAuditHistoryByCustomerIdRequest queryRequest)
        {
            var customersHistoryDetails = await repositoryManager.customers.GetCustomerAuditHistoryByCustomerId(queryRequest);
            return customersHistoryDetails!;
        }
        public async Task<List<GetCustomersDetailsByCutomerNameResponse>> GetCustomersDetailsByCutomerName(string customerName)
        {
            return await repositoryManager.customers.GetCustomersDetailsByCutomerName(customerName);
        }
        public async Task<AddEntityDto<bool>> UpdateCustomerSubCustomer(UpdateCustomerSubCustomerRequest requestData)
        {
            return await repositoryManager.customers.UpdateCustomerSubCustomer(requestData);
        }
        public async Task<AddEntityDto<int>> AddSubCustomer(AddSubCustomerRequest requestData)
        {
            string[] subCustomerId = requestData.SubCustomerId!.Split(',');

            AddEntityDto<int> responceData = new();
            foreach (var singleSubCustomerId in subCustomerId)
            {
                if (!string.IsNullOrEmpty(singleSubCustomerId))
                {
                    requestData.SubCustomerId = singleSubCustomerId;
                    responceData = await repositoryManager.customers.AddSubCustomer(requestData);
                }
            }
            return responceData;
        }
        public async Task<EntityList<GetSubCustomerByCustomerIdResponse>> GetSubCustomerByCustomerId(GetSubCustomerByCustomerIdRequest requestData)
        {
            var subCustomerDetails = await repositoryManager.customers.GetSubCustomerByCustomerId(requestData);
            return subCustomerDetails!;
        }

        public async Task<AddEntityDto<int>> DeleteSubCustomer(int subCustomerMainCustomerId, short CurrentUserId)
        {
            short deletedBy = CurrentUserId;
            return await repositoryManager.customers.DeleteSubCustomer(subCustomerMainCustomerId, deletedBy);
        }
        #endregion
    }
}
