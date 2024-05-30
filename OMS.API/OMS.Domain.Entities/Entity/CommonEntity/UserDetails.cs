namespace OMS.Domain.Entities.Entity.CommonEntity
{
    public class UserDetails
    {
        public int? UserID { get; set; }
        public string? UserName { get; set; }
        public string? EmailAddress { get; set; }
        public bool? IsActive { get; set; }
        public bool PasswordResetRequired { get; set; }
    }
}
