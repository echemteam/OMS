using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;

namespace OMS.Domain.Repository.Implementation
{
    internal class SupplierAccoutingSettingRepository : BaseRepository<Customers>, ISupplierAccoutingSettingRepository
    {
        #region SP Name
        const string ADDEDITCUSTOMERSBASICINFORMATION = "AddEditCustomersBasicInformation";
        #endregion

        public SupplierAccoutingSettingRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Supplier Accouting Setting Repository
        #endregion
    }
}
