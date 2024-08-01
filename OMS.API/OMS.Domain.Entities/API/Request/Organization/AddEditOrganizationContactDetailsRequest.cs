namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationContactDetailsRequest
    {
        public byte? OrganizationContactDetailId { get; set; }
        public string? CompanyWebsite { get; set; }
        public string? SalesEmail { get; set; }
        public string? AccountsEmail { get; set; }
        public string? PurchaseEmail { get; set; }
        public string? CustomerServiceEmail { get; set; }
        public string? SalesPhone { get; set; }
        public string? AccountsPhone { get; set; }
        public string? TollFreePhone { get; set; }
    }
}
