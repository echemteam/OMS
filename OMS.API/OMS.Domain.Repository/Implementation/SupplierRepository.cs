using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Customers;
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
        #endregion

        public SupplierRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Supplier Repository
        public async Task<AddEntityDTO<int>> AddEditSupplierBasicInformation(SupplierDTO supplier)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITSUPPLIERBASICINFORMATION, new
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
                supplier.CreatedBy
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
                queryRequest.Filters?.SearchText
            }, true);
        }

        public async Task<AddEntityDTO<int>> UpdateSupplierInActiveStatus(SupplierDTO supplier)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATECUSTOMERINACTIVESTATUS, new
            {
                supplier.SupplierId,
                supplier.StatusId,
                supplier.InActiveReason,
                supplier.UpdatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> UpdateSupplierApproveStatus(SupplierDTO supplier)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATESUPPLIERAPPROVESTATUS, new
            {
                supplier.SupplierId,
                supplier.ApprovedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> AddAddressForSupplier(AddAddressForSupplierRequest requestData, short createdBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDADDRESSFORSUPPLIER, new
            {
                requestData.SupplierId,
                requestData.AddressId,
                requestData.AddressTypeId,
                requestData.IsPreferredBilling,
                requestData.IsPreferredShipping,
                createdBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDTO<int>> UpdateAddressForSupplier(UpdateAddressForSupplierRequest requestData, short updatedBy)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATEADDRESSFORSUPPLIER, new
            {
                requestData.SupplierId,
                requestData.AddressId,
                requestData.AddressTypeId,
                requestData.IsPreferredBilling,
                requestData.IsPreferredShipping,
                updatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> UpdateSupplierStatus(SupplierDTO supplier)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(UPDATESUPPLIERSTATUS, new
            {
                supplier.SupplierId,
                supplier.StatusId,
                supplier.UpdatedBy,
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDTO<int>> CheckSupplierNameExist(SupplierDTO supplier)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(CHECKSUPPLIERNAMEEXIST, new
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
               
            }, true);
        }
        #endregion
    }
}
