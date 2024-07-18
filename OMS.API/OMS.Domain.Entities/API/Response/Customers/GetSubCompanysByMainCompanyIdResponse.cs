namespace OMS.Domain.Entities.API.Response.Customers
{
    public class GetSubCompanysByMainCompanyIdResponse
    {
        public int? SubCompanyMainCompanyId { get; set; }
        public int? MainCompanyId { get; set; }
        public string? SubCompanyId { get; set; }
        public string? SubCompanyName { get; set; }
        public string? CountryName { get; set; }
        public string? TaxId { get; set; }
    }
}
