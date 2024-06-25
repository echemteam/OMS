﻿using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Customers
{
    public interface ICustomersServices
    {
        Task<AddEntityDTO<int>> AddCustomersBasicInformation(AddCustomersBasicInformationRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData, short CurrentUserId);
        Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int customerId);
        Task<EntityList<GetCustomersResponse>> GetCustomers(GetCustomersRequest queryRequest);
        Task<AddEntityDTO<int>> CheckCustomerNameExist(CheckCustomerNameExistRequest requestData);
        Task<AddEntityDTO<int>> UpdateCustomerApproveStatus(UpdateCustomerApproveStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateCustomerInActiveStatus(UpdateCustomerInActiveStatusRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateCustomerStatus(UpdateCustomerStatusRequest requestData, short CurrentUserId);
        Task<List<GetCustomerAuditHistoryByCustomerIdResponse>> GetCustomerAuditHistoryByCustomerId(int customerId);
    }
}
