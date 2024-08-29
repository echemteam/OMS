using Common.Helper.Export;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.OrderAddress;
using OMS.Domain.Entities.Entity.OrderDocument;
using OMS.Domain.Entities.Entity.Orders;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
using OMS.Shared.Services.Contract;
using System.Data;

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
        public async Task<AddEntityDto<int>> AddOrder(AddOrderRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responseData = new();
            OrderDto orderDto = requestData.ToMapp<AddOrderRequest, OrderDto>();
            orderDto.CreatedBy = CurrentUserId;
            responseData = await repositoryManager.order.AddOrder(orderDto);

            if (responseData.KeyValue > 0)
            {
                if (!string.IsNullOrEmpty(requestData.Base64File) && !string.IsNullOrEmpty(requestData.StoragePath))
                {
                    string AESKey = commonSettingService.EncryptionSettings.AESKey!;
                    string AESIV = commonSettingService.EncryptionSettings.AESIV!;

                    requestData.DocumentName = FileManager.SaveEncryptFile(
                        requestData.Base64File!,
                        Path.Combine(commonSettingService.ApplicationSettings.SaveFilePath!, requestData.StoragePath, responseData.KeyValue.ToString()),
                        requestData.DocumentName!,
                        AESKey,
                        AESIV
                    );
                }

                if (requestData.BillingAddressId > 0 || requestData.ShippingAddressId > 0)
                {
                    OrderAddressDto orderAddressDto = requestData.ToMapp<AddOrderRequest, OrderAddressDto>();
                    orderAddressDto.OrderId=responseData.KeyValue;
                    orderAddressDto.CreatedBy = CurrentUserId;
                    await repositoryManager.orderAddress.AddOrderAddress(orderAddressDto);
                }

                if (requestData.IsEndUser == true || requestData.IsInvoiceSubmission == true || requestData.IsPurchasing == true)
                {
                    DataTable orderContactsListDataTable = ExportHelper.ListToDataTable(requestData.orderContactsList!);
                    orderContactsListDataTable.Columns.Add("OrderId", typeof(short));

                    foreach (DataRow row in orderContactsListDataTable.Rows)
                    {
                        row["OrderId"] = responseData.KeyValue;
                    }
                    await repositoryManager.orderContact.AddOrderContact(orderContactsListDataTable);
                }
                
                if (requestData.orderItemsList != null && requestData.orderItemsList.Any())
                {
                    OrderDocumentDto orderDocumentDto = requestData.ToMapp<AddOrderRequest, OrderDocumentDto>();
                    orderDocumentDto.OrderId = responseData.KeyValue;
                    orderDocumentDto.CreatedBy = CurrentUserId;
                    DataTable orderItemsListDataTable = ExportHelper.ListToDataTable(requestData.orderItemsList);

                    orderItemsListDataTable.Columns.Add("OrderId", typeof(int));
                    orderItemsListDataTable.Columns.Add("CreatedBy", typeof(short));

                    foreach (DataRow row in orderItemsListDataTable.Rows)
                    {
                        row["OrderId"] = responseData.KeyValue;
                        row["CreatedBy"] = CurrentUserId;
                    }
                    await repositoryManager.orderItem.AddOrderItem(orderItemsListDataTable, orderDocumentDto);
                }
            }
            return responseData;
        }
        #endregion
    }
}
