namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationLogisticDetailsRequest
    {
        public byte? OrganizationLogisticDetailId { get; set; }
        public string? FedExAccount { get; set; }
        public string? DHLAccount { get; set; }
        public string? UPSAccount { get; set; }
        public string? USPSAccount { get; set; }
    }
}
