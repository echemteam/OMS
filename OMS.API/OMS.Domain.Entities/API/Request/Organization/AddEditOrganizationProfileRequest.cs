namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationProfileRequest
    {
        public byte? OrganizationId { get; set; }
        public string? Name { get; set; }
        public string? Logo { get; set; }
        public string? Base64File { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? CityId { get; set; }
        public int? StateId { get; set; }
        public short? CountryId { get; set; }
        public int? ZipCode { get; set; }
    }
}
