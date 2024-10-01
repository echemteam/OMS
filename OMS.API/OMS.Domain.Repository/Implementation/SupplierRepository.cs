using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Supplier;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SupplierRepository : BaseRepository<Suppliers>, ISupplierRepository
    {
        #region SP Name
        const string ADDEDITSUPPLIERBASICINFORMATION = "AddEditSupplierBasicInformation";
        const string GETSUPPLIERBASICINFORMATIONBYID = "GetSupplierBasicInformationById";
        const string GETSUPPLIERS = "GetSuppliers";
        const string UPDATECUSTOMERINACTIVESTATUS = "UpdateSupplierInActiveStatus";
        const string UPDATESUPPLIERAPPROVESTATUS = "UpdateSupplierApproveStatus";
        const string ADDADDRESSFORSUPPLIER = "AddAddressForSupplier";
        const string UPDATEADDRESSFORSUPPLIER = "UpdateAddressForSupplier";
        const string UPDATESUPPLIERSTATUS = "UpdateSupplierStatus";
        const string CHECKSUPPLIERNAMEEXIST = "CheckSupplierNameExist";
        const string GETSUPPLIERAUDITHISTORYBYSUPPLIERID = "GetSupplierAuditHistoryBySupplierId";
        const string ADDEDITCONTACTFORSUPPLIER = "AddEditContactForSupplier";
        const string GETSUPPLIERDETAILSBYSUPPLIERNAME = "GetSupplierDetailsBySupplierName";
        const string ADDEDITRESPONSIBLEUSERFORSUPPLIER = "AddEditResponsibleUserForSupplier";
        #endregion

        public SupplierRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Supplier Repository
        public async Task<AddEditResponse> AddEditSupplierBasicInformation(SupplierDto supplier)
        {
            return await _context.GetSingleAsync<AddEditResponse>(ADDEDITSUPPLIERBASICINFORMATION, new
            {
                supplier.SupplierId,
                supplier.GroupTypeId,
                supplier.SupplierTypeId,
                supplier.Name,
                supplier.DbaName,
                supplier.TerritoryId,
                supplier.Website,
                supplier.CountryId,
                supplier.TaxId,
                supplier.Note,
                supplier.EmailAddress,
                supplier.CreatedBy,
                //supplier.ResponsibleUserId
                supplier.IncotermId,
                supplier.AttachmentName
            }, CommandType.StoredProcedure);
        }

        public async Task<GetSupplierBasicInformationByIdResponse> GetSupplierBasicInformationById(int supplierId)
        {
            GetSupplierBasicInformationByIdResponse customerDetails = await _context.GetFrist<GetSupplierBasicInformationByIdResponse>(GETSUPPLIERBASICINFORMATIONBYID, new
            {
                supplierId
            }, CommandType.StoredProcedure);
            return customerDetails;
        }

        public async Task<EntityList<GetSuppliersResponse>> GetSuppliers(GetSuppliersRequest queryRequest)
        {
            return await _context.GetListSP<GetSuppliersResponse>(GETSUPPLIERS, new
            {
                queryRequest.StatusId,
                queryRequest.Pagination!.PageNumber,
                queryRequest.Pagination.PageSize,
                queryRequest.Filters?.SearchText,
                queryRequest.SortString
            }, true);
        }

        public async Task<AddEntityDto<int>> UpdateSupplierInActiveStatus(SupplierDto supplier)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATECUSTOMERINACTIVESTATUS, new
            {
                supplier.SupplierId,
                supplier.StatusId,
                supplier.InActiveReason,
                supplier.UpdatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> UpdateSupplierApproveStatus(SupplierDto supplier)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATESUPPLIERAPPROVESTATUS, new
            {
                supplier.SupplierId,
                supplier.ApprovedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> AddAddressForSupplier(AddAddressForSupplierRequest requestData, short createdBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDADDRESSFORSUPPLIER, new
            {
                requestData.SupplierId,
                requestData.AddressId,
                requestData.AddressTypeId,
                createdBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> UpdateAddressForSupplier(UpdateAddressForSupplierRequest requestData, short updatedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATEADDRESSFORSUPPLIER, new
            {
                requestData.SupplierId,
                requestData.AddressId,
                requestData.AddressTypeId,
                updatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> UpdateSupplierStatus(SupplierDto supplier)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATESUPPLIERSTATUS, new
            {
                supplier.SupplierId,
                supplier.StatusId,
                supplier.UpdatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> CheckSupplierNameExist(SupplierDto supplier)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(CHECKSUPPLIERNAMEEXIST, new
            {
                supplier.Name,
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetSupplierAuditHistoryBySupplierIdResponse>> GetSupplierAuditHistoryBySupplierId(GetSupplierAuditHistoryBySupplierIdRequest queryRequest)
        {
            return await _context.GetListSP<GetSupplierAuditHistoryBySupplierIdResponse>(GETSUPPLIERAUDITHISTORYBYSUPPLIERID, new
            {
                queryRequest.SupplierId,
                queryRequest.Pagination!.PageNumber,
                queryRequest.Pagination.PageSize,
                queryRequest.EventName,
                queryRequest.UserId,
                queryRequest.ToDate,
                queryRequest.FromDate
            }, true);
        }

        public async Task<AddEntityDto<int>> AddEditContactForSupplier(AddEditContactForSupplierRequest requestData, short createdBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITCONTACTFORSUPPLIER, new
            {
                requestData.SupplierContactId,
                requestData.SupplierId,
                requestData.ContactId,
                requestData.ContactTypeId,
                requestData.IsPrimary,
                createdBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetSupplierDetailsBySupplierNameResponse>> GetSupplierDetailsBySupplierName(string supplierName)
        {
            List<GetSupplierDetailsBySupplierNameResponse> supplierDetails = await _context.GetList<GetSupplierDetailsBySupplierNameResponse>(GETSUPPLIERDETAILSBYSUPPLIERNAME, new
            {
                supplierName
            }, CommandType.StoredProcedure);
            return supplierDetails;
        }
        public async Task<AddEntityDto<int>> AddEditResponsibleUserForSupplier(AddEditResponsibleUserForSupplierRequest requestData, short createdBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITRESPONSIBLEUSERFORSUPPLIER, new
            {
                requestData.SupplierId,
                requestData.UserId,
                createdBy,
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
