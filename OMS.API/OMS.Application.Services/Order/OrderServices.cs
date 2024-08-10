using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Orders;
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
        public async Task<AddEntityDto<int>> AddEditOrderInformation(AddEditOrderInformationRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responseData = new();
            OrderDto orderDto = requestData.ToMapp<AddEditOrderInformationRequest, OrderDto>();
            orderDto.CreatedBy = CurrentUserId;
            responseData = await repositoryManager.order.AddEditOrderInformation(orderDto);

            if (responseData.KeyValue > 0 && (requestData.BillingAddressId > 0 || requestData.ShippingAddressId > 0))
            {
                AddEditOrderInformationRequest addEditOrderAddressInformationRequest = new()
                {
                    OrderId = responseData.KeyValue,
                    OrderAddressId = requestData.OrderAddressId,
                    BillingAddressId = requestData.BillingAddressId,
                    ShippingAddressId = requestData.ShippingAddressId,
                };
                OrderAddressDto orderAddressDto = requestData.ToMapp<AddEditOrderInformationRequest, OrderAddressDto>();
                orderAddressDto.CreatedBy = CurrentUserId;
                _ = await repositoryManager.order.AddEditOrderAddressInformation(orderAddressDto);
            }
            return responseData;
        }
        public async Task<AddEntityDto<int>> AddEditOrderContactInformation(AddEditOrderContactInformationRequest requestData, short CurrentUserId)
        {
            OrderDto orderDto = requestData.ToMapp<AddEditOrderContactInformationRequest, OrderDto>();
            orderDto.CreatedBy = CurrentUserId;
            AddEntityDto<int> responseData = await repositoryManager.order.AddEditOrderContactInformation(orderDto);
            return responseData;
        }

        #endregion
    }
}
