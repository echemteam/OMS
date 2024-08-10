using OMS.Domain.Entities.API.Response.SupplierDocuements;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierDocuements;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;


namespace OMS.Domain.Repository.Implementation
{
    internal class SupplierdocuementsRepositery : BaseRepository<SupplierDocuements>, ISupplierdocuementsRepositery
    {
        #region SP
        const string ADDSUPPLIERDOCUMENTS = "AddSupplierDocuments";
        const string GETSUPPLIERDOCUMENTSBYID = "GetSupplierDocuementById";
        const string DELETESUPPLIERDOCUMENTSBYID = "DeleteSupplierDocuementById";
        const string CHECKDOCUMENTSEXISTORNOTFORSUPPLIER = "CheckDocumentsExistOrNotForSupplier";
        #endregion

        public SupplierdocuementsRepositery(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Repositery

        public async Task<AddEntityDto<int>> CheckDocumentsExistOrNot(byte? documentTypeId, string? name, int? supplierId)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(CHECKDOCUMENTSEXISTORNOTFORSUPPLIER, new
            {
                documentTypeId,
                name,
                supplierId
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> AddSupplierDocuments(SupplierDocumentsDto supplierDocuements)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDSUPPLIERDOCUMENTS, new
            {
                supplierDocuements.Name,
                supplierDocuements.DocumentTypeId,
                supplierDocuements.SupplierId,
                supplierDocuements.Attachment,
                supplierDocuements.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<List<GetSupplierDocumentsByIdResponse>> GetSupplierDocumentsById(int supplierId)
        {
            List<GetSupplierDocumentsByIdResponse> customerDetails = await _context.GetList<GetSupplierDocumentsByIdResponse>(GETSUPPLIERDOCUMENTSBYID, new
            {
                supplierId
            }, CommandType.StoredProcedure);
            return customerDetails;
        }
        public async Task<AddEntityDto<int>> DeleteSupplierDocumentsById(int supplierDocumentId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETESUPPLIERDOCUMENTSBYID, new
            {
                supplierDocumentId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
