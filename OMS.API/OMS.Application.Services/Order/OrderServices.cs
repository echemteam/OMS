﻿using Common.Helper.Enum;
using Common.Helper.Export;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Request.OrderAddress;
using OMS.Domain.Entities.API.Request.Orders;
using OMS.Domain.Entities.API.Request.User;
using OMS.Domain.Entities.API.Response.Orders;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Entities.Entity.OrderAddress;
using OMS.Domain.Entities.Entity.OrderDocument;
using OMS.Domain.Entities.Entity.OrderItems;
using OMS.Domain.Entities.Entity.Orders;
using OMS.Domain.Entities.Entity.User;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.Entities.CommonEntity;
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

            if (responseData.KeyValue <= 0)
                return responseData;

            if (responseData.KeyValue > 0)
            {
                if (requestData.BillingAddressId > 0 || requestData.ShippingAddressId > 0)
                {
                    OrderAddressDto orderAddressDto = requestData.ToMapp<AddOrderRequest, OrderAddressDto>();
                    orderAddressDto.OrderId = responseData.KeyValue;
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
                    foreach (var item in requestData.orderItemsList)
                    {
                        // Map each individual item
                        OrderItemsDto orderItemsDto = item.ToMapp<OrderItemsRequest, OrderItemsDto>();
                        orderItemsDto.OrderId = responseData.KeyValue;
                        orderItemsDto.CreatedBy = CurrentUserId;
                        orderItemsDto.EntityType = "OrderItem";
                        await repositoryManager.orderItem.AddOrderItem(orderItemsDto);
                    }
                }

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
                if (requestData.DocumentName != null || requestData.DocumentName != "" && responseData.KeyValue > 0)
                {
                    OrderDocumentDto orderDocumentDto = requestData.ToMapp<AddOrderRequest, OrderDocumentDto>();
                    orderDocumentDto.OrderId = responseData.KeyValue;
                    orderDocumentDto.CreatedBy = CurrentUserId;
                    await repositoryManager.orderDocument.AddOrderDocumnet(orderDocumentDto);
                }
            }
            return responseData;
        }

        public async Task<GetOrderResponse> GetOrders(GetOrderRequest request)
        {
            EntityList<OrderListResponse> Order = await repositoryManager.order.GetOrders(request);
            List<GetOrderItemsByOrderIdResponse> OrderItems = await repositoryManager.order.GetOrderItemsByOrderId(0);
            GetOrderResponse response = new()
            {
                OrderList = Order?.DataSource,
                OrderItemList = OrderItems,
                TotalRecord = Order?.TotalRecord ?? 0,
            };
            return response!;
        }
        public async Task<List<GetOrderItemsByOrderIdResponse>> GetOrderItemsByOrderId(int orderId)
        {
            return await repositoryManager.order.GetOrderItemsByOrderId(orderId);
        }
        public async Task<GetOrderDetailByOrderIdResponse> GetOrderDetailByOrderId(int orderId)
        {
            var orderDetails = await repositoryManager.order.GetOrderDetailByOrderId(orderId);
            if (orderDetails == null)
            {
                return orderDetails!;
            }

            // Get Address Information
            AddressResponse orderBillingAddresses = await repositoryManager.order.GetOrderAddressesByOrderId(orderDetails.BillingAddressId);
            AddressResponse orderShippingAddresses = await repositoryManager.order.GetOrderAddressesByOrderId(orderDetails.ShippingAddressId);

            orderDetails.OrderAddressInformation = new GetOrderAddressByOrderIdResponse
            {
                BillingAddress = orderBillingAddresses,
                ShippingAddress = orderShippingAddresses
            };

            // Get Contact Information
            orderDetails.OrderContactList = await repositoryManager.order.GetOrderContactByOrderId(orderId);
            var ownerTypeId = (short)OwnerType.CustomerContact;
            var tasks = orderDetails.OrderContactList.Select(async contact =>
            {
                var emailTask = repositoryManager.emailAddress.GetEmailByContactId(contact.ContactId, ownerTypeId);
                var phoneTask = repositoryManager.phoneNumber.GetPhoneByContactId(contact.ContactId);

                var emailAddresses = await emailTask;
                var phoneNumbers = await phoneTask;

                contact.EmailAddressList = emailAddresses;
                contact.PhoneNumberList = phoneNumbers;
            });
            await Task.WhenAll(tasks);

            // Get Document Information
            orderDetails.OrderDocumentList = await repositoryManager.order.GetOrderDocumentByOrderId(orderId);


            return orderDetails!;
        }
        public async Task<AddEntityDto<int>> DeleteOrder(int orderId, int deletedBy)
        {
            return await repositoryManager.order.DeleteOrder(orderId, deletedBy);
        }

        public async Task<AddEntityDto<int>> AddOrderDocuments(AddOrderDocumentsRequest requestData, short CurrentUserId)
        {
            AddEntityDto<int> responseData = new();
            if (requestData.DocumentOrderList != null)
            {
                foreach (var document in requestData.DocumentOrderList)
                {
                    if (!string.IsNullOrEmpty(document.Base64File) && !string.IsNullOrEmpty(requestData.StoragePath))
                    {
                        string AESKey = commonSettingService.EncryptionSettings.AESKey!;
                        string AESIV = commonSettingService.EncryptionSettings.AESIV!;


                        document.DocumentName = FileManager.SaveEncryptFile(
                            document.Base64File!,
                            Path.Combine(commonSettingService.ApplicationSettings.SaveFilePath!, requestData.StoragePath, requestData.OrderId.ToString()!),
                            document.DocumentName,
                            AESKey,
                            AESIV);
                    }


                }
            }

            // Map the request to the DTO and add it to the repository
            OrderDocumentDto orderDocumentsDto = requestData.ToMapp<AddOrderDocumentsRequest, OrderDocumentDto>();
            orderDocumentsDto.CreatedBy = CurrentUserId;
            var modifyData = requestData.DocumentOrderList.Select(data => new { data.DocumentName, data.DocumentType }).ToList();
            DataTable documentDataTable = ExportHelper.ListToDataTable(modifyData);
            responseData = await repositoryManager.order.AddOrderDocuments(orderDocumentsDto, documentDataTable);
            return responseData;
        }
        public async Task<GetOrderItemByOrderItemIdResponse> GetOrderItemByOrderItemId(int orderItemId)
        {
            var orderItemDetails = await repositoryManager.order.GetOrderItemByOrderItemId(orderItemId);
            if (orderItemDetails == null)
            {
                return orderItemDetails!;
            }

            // Get Address Information
            AddressResponse orderShippingAddresses = await repositoryManager.order.GetOrderAddressesByOrderId(orderItemDetails.ShippingAddressId);

            orderItemDetails.OrderAddressInformation = new GetOrderAddressByOrderIdResponse
            {
                ShippingAddress = orderShippingAddresses
            };
            return orderItemDetails!;
        }
        #endregion
    }
}

        public async Task<AddEntityDto<int>> UpdateOrderAddress(UpdateOrderAddressRequest requestData, short CurrentUserId)
        {
            OrderAddressDto order  = requestData.ToMapp<UpdateOrderAddressRequest, OrderAddressDto>();
            order.UpdatedBy = CurrentUserId;
            return await repositoryManager.orderAddress.UpdateOrderAddress(order);
        }
    }
    #endregion
} 

