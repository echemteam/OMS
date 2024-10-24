﻿using Common.Helper.ApprovalRules;
using Common.Helper.Enum;
using Common.Helper.Export;
using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.Domain.Entities.Entity.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Repository;
using OMS.FileManger.Services;
using OMS.Shared.Services.Contract;
using System.Data;

namespace OMS.Application.Services.CustomerDocuments
{
    public class CustomerDocumentsService : BaseServices, ICustomerDocumentsService
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public CustomerDocumentsService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion

        #region Customer Documents Services
        public async Task<AddEntityDto<int>> AddCustomerDocuments(AddCustomerDocumentsRequest requestData, short CurrentUserId)
        {
            //AddEntityDto<int> responseData = await repositoryManager.customerDocuments.CheckDocumentsExistOrNot(requestData.DocumentTypeId, requestData.Name, requestData.CustomerId);
            AddEntityDto<int> responseData = new();
            var customerId = Convert.ToInt32(requestData.CustomerId);
            var existingData = await repositoryManager.customers.GetCustomersBasicInformationById(customerId);

            if (existingData.StatusId == (short)Status.Approved)
            {
                var ApprovalEventName = new[]
                {
                   ApprovalEvent.UploadCustomerDocument,
                };

                var approvalRules = await repositoryManager.approval.GetApprovalConfiguration();
                var matchingRule = approvalRules?.FirstOrDefault(rule => ApprovalEventName.Contains(rule.EventName));

                if (matchingRule != null)
                {
                    var formatTemplate = await repositoryManager.emailTemplates.GetTemplateByFunctionalityEventId(matchingRule.FunctionalityEventId);
                    ApprovalRequestsDto approvalResponceData = await ApprovalRuleHelper.ProcessApprovalRequest(
                        null,
                        requestData,
                        CurrentUserId,
                        formatTemplate,
                        matchingRule
                    );
                    responseData = await repositoryManager.approval.AddApprovalRequests(approvalResponceData);
                }
            }
            else
            {
                if (requestData.DocumentInfoList != null)
                {
                    foreach (var document in requestData.DocumentInfoList)
                    {
                        if (!string.IsNullOrEmpty(document.Base64File) && !string.IsNullOrEmpty(requestData.StoragePath))
                        {
                            string AESKey = commonSettingService.EncryptionSettings.AESKey!;
                            string AESIV = commonSettingService.EncryptionSettings.AESIV!;

                            document.Attachment = FileManager.SaveEncryptFile(
                                document.Base64File!,
                                Path.Combine(commonSettingService.ApplicationSettings.SaveFilePath!, requestData.StoragePath, requestData.CustomerId.ToString()!),
                                document.Attachment!,
                                AESKey,
                                AESIV
                            );
                        }
                    }

                    // Map the request to the DTO and add it to the repository
                    CustomerDocumentsDto customerDocumentsDto = requestData.ToMapp<AddCustomerDocumentsRequest, CustomerDocumentsDto>();
                    customerDocumentsDto.CreatedBy = CurrentUserId;
                    var modifyData = requestData.DocumentInfoList.Select(data => new { data.Name, data.Attachment, data.DocumentTypeId,data.DocumentType }).ToList();
                    DataTable documentDataTable = ExportHelper.ListToDataTable(modifyData);
                    responseData = await repositoryManager.customerDocuments.AddCustomerDocuments(customerDocumentsDto, documentDataTable);
                }
            }

            return responseData;

        }

        public async Task<List<GetCustomerDocumentsByIdResponse>> GetCustomerDocumentsById(int customerId)
        {
            List<GetCustomerDocumentsByIdResponse> documentList = await repositoryManager.customerDocuments.GetCustomerDocumentsById(customerId);
            return documentList;
        }

        public async Task<AddEntityDto<int>> DeleteCustomerDocumentsById(int customerDocumentId, int deletedBy)
        {
            return await repositoryManager.customerDocuments.DeleteCustomerDocumentsById(customerDocumentId, deletedBy);
        }

        #endregion
    }
}
