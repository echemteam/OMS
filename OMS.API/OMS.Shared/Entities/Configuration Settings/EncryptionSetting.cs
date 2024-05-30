namespace OMS.Shared.Entities.Configuration_Settings
{
    public class EncryptionSetting
    {
        public bool IsEnableEncryption { get; set; }
        public string? AESKey { get; set; }
        public string? AESIV { get; set; }
    }
}
