using Common.Helper.Extension;
using Common.Helper.Utility;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Repository;
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
            customersDTO.RefCode = EncryptionUtil.GenerateReferenceCode();
            customersDTO.ListCode = EncryptionUtil.GenerateListCode(requestData.TaxId!, requestData.Name!);
            return await repositoryManager.customers.AddCustomersBasicInformation(customersDTO);
        }

        public async Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData, short CurrentUserId)
        {
            CustomersDTO customersDTO = requestData.ToMapp<UpdateCustomersBasicInformationRequest, CustomersDTO>();
            customersDTO.CreatedBy = CurrentUserId;
            customersDTO.RefCode = EncryptionUtil.GenerateReferenceCode();
            customersDTO.ListCode = EncryptionUtil.GenerateListCode(requestData.TaxId!, requestData.Name!);
            return await repositoryManager.customers.UpdateCustomersBasicInformation(customersDTO);
        }

        public async Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int CustomerId)
        {
            return await repositoryManager.customers.GetCustomersBasicInformationById(CustomerId);
        }
        #endregion
    }
}
