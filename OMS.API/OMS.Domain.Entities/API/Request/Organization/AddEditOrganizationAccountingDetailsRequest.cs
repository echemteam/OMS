namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationAccountingDetailsRequest
    {
        public byte? OrganizationAccountingDetailId { get; set; }
        public decimal? CreditLimit { get; set; }
    }
}
