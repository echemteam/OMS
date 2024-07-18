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
            CustomersDTO customersDTO = requestData.ToMapp<AddEditCustomersBasicInformationRequest, CustomersDTO>();
            customersDTO.CreatedBy = CurrentUserId;
            AddEditResponse responseData = await repositoryManager.customers.AddEditCustomersBasicInformation(customersDTO);

            if (!string.IsNullOrEmpty(requestData.Note) && responseData.KeyValue > 0)
            {
                _ = new AddEntityDTO<long>();
                CustomerNotesDTO customerNotes = new()
                {
                    CustomerNoteId = requestData.CustomerNoteId,
                    Note = requestData.Note,
                    CustomerId = responseData.KeyValue,
                    CreatedBy = CurrentUserId
                };
                AddEntityDTO<long> addEntityDTO;
                if (requestData.CustomerNoteId > 0)
                {
                    // Update existing customer note
                    customerNotes.UpdatedBy = CurrentUserId;
                    addEntityDTO = await repositoryManager.customerNotes.UpdateCustomerNotes(customerNotes);
                    responseData.NoteId = addEntityDTO.KeyValue;
                }
                else
                {
                    // Add new customer note
                    addEntityDTO = await repositoryManager.customerNotes.AddCustomerNotes(customerNotes);
                    responseData.NoteId = addEntityDTO.KeyValue;
                }
            }
            return responseData;
        }

        public async Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData, short CurrentUserId)
        {
            CustomersDTO customersDTO = requestData.ToMapp<UpdateCustomersBasicInformationRequest, CustomersDTO>();
            customersDTO.UpdatedBy = CurrentUserId;
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

        public async Task<AddEntityDTO<int>> UpdateCustomerApproveStatus(UpdateCustomerApproveStatusRequest requestData, short CurrentUserId)
        {
            CustomersDTO customersDTO = requestData.ToMapp<UpdateCustomerApproveStatusRequest, CustomersDTO>();
            customersDTO.ApprovedBy = CurrentUserId;
            return await repositoryManager.customers.UpdateCustomerApproveStatus(customersDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomerInActiveStatus(UpdateCustomerInActiveStatusRequest requestData, short CurrentUserId)
        {
            CustomersDTO customersDTO = requestData.ToMapp<UpdateCustomerInActiveStatusRequest, CustomersDTO>();
            customersDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.customers.UpdateCustomerInActiveStatus(customersDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomerStatus(UpdateCustomerStatusRequest requestData, short CurrentUserId)
        {
            CustomersDTO customersDTO = requestData.ToMapp<UpdateCustomerStatusRequest, CustomersDTO>();
            customersDTO.UpdatedBy = CurrentUserId;
            return await repositoryManager.customers.UpdateCustomerStatus(customersDTO);
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
        public async Task<AddEntityDTO<bool>> UpdateCustomerSubCompany(UpdateCustomerSubCompanyRequest requestData)
        {
            return await repositoryManager.customers.UpdateCustomerSubCompany(requestData);
        }
        public async Task<AddEntityDTO<int>> AddSubCompanyMainCompany(AddSubCompanyMainCompanyRequest requestData)
        {
            string[] subCompanyId = requestData.SubCompanyId!.Split(',');

            AddEntityDTO<int> responceData = new();
            foreach (var singleSubCompanyId in subCompanyId)
            {
                requestData.SubCompanyId = singleSubCompanyId;
                responceData = await repositoryManager.customers.AddSubCompanyMainCompany(requestData);
            }
            return responceData;
        }

        #endregion
    }
}
