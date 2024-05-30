namespace OMS.Shared.Entities.Configuration_Settings
{
    public class EmailSetting
    {
        public string? FromEmail { get; set; }
        public string? HostName { get; set; }
        public string? Password { get; set; }
        public string? Port { get; set; }
        public string? EnableSSL { get; set; }
        public string? ErrorEmailTo { get; set; }
    }
}
