using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Contact;
using OMS.Domain.Entities.API.Request.CustomerAccountingNotes;
using OMS.Domain.Entities.API.Request.CustomerNotes;
using OMS.Domain.Entities.API.Response.CustomerAccountingSettings;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Entities.Entity.CustomerAccountingSettings;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Repository;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.Services.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Application.Services.CustomerAccountingSettings
{
    public class CustomerAccountingSettingsService : BaseServices, ICustomerAccoutingSettingsService
    {
        #region variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public CustomerAccountingSettingsService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        #region Services
        public async Task<GetDetailsByCustomerIdResponse> GetDetailsbyCustomerID(int customerId)
        {
            return await repositoryManager.customerAccountingSettings.GetDetailsbyCustomerID(customerId);
        }
        public async Task<AddEntityDTO<int>> AddEditCustomerSettings(AddEditCustomerSettingRequest requestData, short CurrentUserId)
        {
           CustomerAccountingSettingsDTO  customerAccountingSettingsDTO  = requestData.ToMapp<AddEditCustomerSettingRequest, CustomerAccountingSettingsDTO>();
           customerAccountingSettingsDTO.CreatedBy = CurrentUserId;
           return await repositoryManager.customerAccountingSettings.AddEditCustomerSettings(customerAccountingSettingsDTO);
        }

        public async Task<AddEntityDTO<int>> DeleteCustomerDeliveryCarriersById(int customerDeliveryCarrierId, int deletedBy)
        {
            return await repositoryManager.customerAccountingSettings.DeleteCustomerDeliveryCarriersById(customerDeliveryCarrierId, deletedBy);
        }

        public async Task<AddEntityDTO<int>> DeleteCustomerDeliveryMethodsById(int customerDeliveryMethodId, int deletedBy)
        {
            return await repositoryManager.customerAccountingSettings.DeleteCustomerDeliveryMethodsById(customerDeliveryMethodId, deletedBy);

        }
        #endregion
    }
}
