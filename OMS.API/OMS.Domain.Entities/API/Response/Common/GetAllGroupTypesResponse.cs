namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllGroupTypesResponse
    {
        public short? GroupTypeId { get; set; }
        public string? Type { get; set; }
        public bool? IsForCustomers {  get; set; }
        public bool? IsForSuppliers {  get; set; }
    }
}
