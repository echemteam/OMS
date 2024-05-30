using Microsoft.Extensions.Options;
using OMS.Shared.Entities.Configuration_Settings;
using OMS.Shared.Services.Contract;

namespace OMS.Shared.Services.Implementation
{
    public class CommonSettingService : ICommonSettingService
    {
        private readonly ApplicationSetting _appSettings;
        private readonly EncryptionSetting _encryptionSetting;
        private readonly JwtTokenSetting _jwtTokenSettings;
        private readonly AuthorizeDomainSetting _authorizeDomainSetting;
        private readonly EmailSetting _emailSettings;
        public CommonSettingService(IOptions<ApplicationSetting> appSetting,
                             IOptions<EncryptionSetting> encryptionSetting,
                             IOptions<JwtTokenSetting> jwtTokenSetting,
                             IOptions<AuthorizeDomainSetting> authorizeDomainSetting,
                             IOptions<EmailSetting> emailSettings)
        {
            _appSettings = appSetting.Value;
            _encryptionSetting = encryptionSetting.Value;
            _jwtTokenSettings = jwtTokenSetting.Value;
            _authorizeDomainSetting = authorizeDomainSetting.Value;
            _emailSettings = emailSettings.Value;
        }

        public ApplicationSetting ApplicationSettings { get { return _appSettings; } }
        public EncryptionSetting EncryptionSettings { get { return _encryptionSetting; } }
        public JwtTokenSetting JwtTokenSettings { get { return _jwtTokenSettings; } }
        public AuthorizeDomainSetting AuthorizeDomainSetting { get { return _authorizeDomainSetting; } }
        public EmailSetting EmailSettings { get { return _emailSettings; } }
    }
}
