namespace OMS.Domain.Entities.API.Request.Customers
{
    public class AddSubCompanyMainCompanyRequest
    {
        public int? MainCompanyId { get; set; }
        public string? SubCompanyId { get; set; }
    }
}
