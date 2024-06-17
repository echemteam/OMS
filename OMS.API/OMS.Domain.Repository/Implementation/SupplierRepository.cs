using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Domain.Entities.Entity.Supplier;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SupplierRepository : BaseRepository<Addresses>, ISupplierRepository
    {
        #region SP Name
        const string ADDADDRESS = "AddAddress";
        #endregion

        public SupplierRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Supplier Repository
        public async Task<AddEntityDTO<int>> AddEditSupplierBasicInformation(SupplierDTO supplier)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDCUSTOMERSBASICINFORMATION, new
            {
                supplier.Name,
                supplier.GroupTypeId,
                supplier.TerritoryId,
                supplier.CountryId,
                supplier.EmailAddress,
                supplier.Website,
                supplier.Note,
                supplier.IsCompany,
                supplier.TaxId,
                supplier.CreatedBy,
                supplier.IsBuyingForThirdParty,
            }, CommandType.StoredProcedure);
        }
        #endregion
    }
}
