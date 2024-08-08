using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Orders;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Order
{
    public class OrderServices : BaseServices, IOrderServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public OrderServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Order Services
        public async Task<AddEntityDto<int>> CheckPoNumberExistOrNot(CheckPoNumberExistOrNotRequest requestData)
        {
            OrderDto orderDto = requestData.ToMapp<CheckPoNumberExistOrNotRequest, OrderDto>();
            return await repositoryManager.order.CheckPoNumberExistOrNot(orderDto);
        }
        public async Task<List<GetPoNumberDetailsByPoNumberResponse>> GetPoNumberDetailsByPoNumber(string poNumber)
        {
            return await repositoryManager.order.GetPoNumberDetailsByPoNumber(poNumber);
        }
        #endregion
    }
}
