using Dapper;
using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.API.Response.CustomerDocuments;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerDocuments;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class CustomerDocumentsRepository : BaseRepository<CustomerDocuments>, ICustomerDocumentsRepository
    {
        #region SP Name
        const string CHECKDOCUMENTSEXISTORNOT = "CheckDocumentsExistOrNot";
        const string ADDCUSTOMERDOCUMENTS = "AddCustomerDocuments";
        const string GETCUSTOMERDOCUMENTSBYID = "GetCustomerDocumentsById";
        const string DELETECUSTOMERDOCUMENTSBYID = "DeleteCustomerDocumentsById";
        #endregion

        public CustomerDocumentsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Customer Documents Repository 
        public async Task<AddEntityDto<int>> CheckDocumentsExistOrNot(byte? documentTypeId, string? name, int? customerId)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(CHECKDOCUMENTSEXISTORNOT, new
            {
                documentTypeId,
                name,
                customerId
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> AddCustomerDocuments(CustomerDocumentsDto customerDocuments,DataTable documentDataTable)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDCUSTOMERDOCUMENTS, new
            {
                //customerDocuments.Name,
                //customerDocuments.DocumentTypeId,
                customerDocuments.CustomerId,
                documentList = documentDataTable.AsTableValuedParameter("[dbo].[DocumentList]"),
                //customerDocuments.Attachment,
                customerDocuments.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetCustomerDocumentsByIdResponse>> GetCustomerDocumentsById(int customerId)
        {
            List<GetCustomerDocumentsByIdResponse> customerDetails = await _context.GetList<GetCustomerDocumentsByIdResponse>(GETCUSTOMERDOCUMENTSBYID, new
            {
                customerId
            }, CommandType.StoredProcedure);
            return customerDetails;
        }
        public async Task<AddEntityDto<int>> DeleteCustomerDocumentsById(int customerDocumentId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETECUSTOMERDOCUMENTSBYID, new
            {
                customerDocumentId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        #endregion
    }
}
