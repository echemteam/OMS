namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationLogisticDetailsResponse
    {
        public byte? OrganizationLogisticDetailId { get; set; }
        public string? FedExAccount { get; set; }
        public string? DHLAccount { get; set; }
        public string? UPSAccount { get; set; }
        public string? USPSAccount { get; set; }

    }
}
