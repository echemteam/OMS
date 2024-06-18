using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Request.Supplier;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Entities.Entity.Supplier;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SupplierRepository : BaseRepository<Addresses>, ISupplierRepository
    {
        #region SP Name
        const string ADDEDITSUPPLIERBASICINFORMATION = "AddEditSupplierBasicInformation";
        const string GETSUPPLIERBASICINFORMATIONBYID = "GetSupplierBasicInformationById";
        const string GETSUPPLIERS = "GetSuppliers";
        const string UPDATECUSTOMERINACTIVESTATUS = "UpdateSupplierInActiveStatus";
        const string UPDATESUPPLIERAPPROVESTATUS = "UpdateSupplierApproveStatus";
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
        #endregion
    }
}
