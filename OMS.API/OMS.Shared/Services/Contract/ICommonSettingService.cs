using OMS.Shared.Entities.Configuration_Settings;

namespace OMS.Shared.Services.Contract
{
    public interface ICommonSettingService
    {
        ApplicationSetting ApplicationSettings { get; }
        EncryptionSetting EncryptionSettings { get; }
        JwtTokenSetting JwtTokenSettings { get; }
        EmailSetting EmailSettings { get; }
        AuthorizeDomainSetting AuthorizeDomainSetting { get; }
    }
}
