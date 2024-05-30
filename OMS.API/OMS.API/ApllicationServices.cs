using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.IdentityModel.Tokens;
using OMS.Framework.Filters;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.Configuration_Settings;
using System.Text;

namespace OMS.API
{
    public static class ApllicationServices
    {

        public static void AddAllAppServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddJwtToken(configuration);
            services.AddActionFilters();
            services.AddDBContext(configuration);
            services.AddCompressor();
            services.GetAppSettingConfig(configuration);
            services.ImplementServiceScopes();

        }

        /// <summary>
        /// Add Dapper DB context to the services
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void AddDBContext(this IServiceCollection services, IConfiguration configuration)
        {

            string? dbConnectionString = configuration.GetConnectionString("OMS");
            if (dbConnectionString != null)
            {
                DapperContext dbContext = new DapperContext(dbConnectionString);
                services.AddSingleton(dbContext);
            }
        }

        public static void AddActionFilters(this IServiceCollection services)
        {

            services.AddControllers(config =>
            {
                config.Filters.Add(typeof(ResponseEncryptionFilter));
                config.Filters.Add(typeof(AuthorizeDomainFilter));
                config.Filters.Add(typeof(ValidationFilterAttribute));
            });
        }

        /// <summary>
        /// Use to read the Config file
        /// </summary>
        /// <param name="services"></param>
        /// <exception cref="NotSupportedException"></exception>
        public static void GetAppSettingConfig(this IServiceCollection services, IConfiguration configuration)
        {

            services.Configure<JwtTokenSetting>(configuration.GetSection("JWTTokenSettings"));
            services.Configure<EncryptionSetting>(configuration.GetSection("EncryptionSetting"));
            services.Configure<ApplicationSetting>(configuration.GetSection("ApplicationSetting"));
            services.Configure<AuthorizeDomainSetting>(configuration.GetSection("AuthorizeDomainSettings"));
            services.Configure<EmailSetting>(configuration.GetSection("EmailSettings"));
        }

        /// <summary>
        ///  When user request any API we will send back the responce in 
        ///  Compress mode using Gzip Compress algo. 
        ///  "ResponceEncoding=gZip"
        /// /// </summary>
        /// <param name="services">Services</param>
        public static void AddCompressor(this IServiceCollection services)
        {
            //Define the Compresion level
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = System.IO.Compression.CompressionLevel.Optimal;
            });
            // Add provider
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<GzipCompressionProvider>();
            });

        }

        /// <summary>
        /// This method will setup the JWT authentication in the project
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void AddJwtToken(this IServiceCollection services, IConfiguration configuration)
        {
            // configure strongly typed settings objects
            var appSettingsSection = configuration.GetSection("JWTTokenSettings");
            services.Configure<JwtTokenSetting>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<JwtTokenSetting>();
            var key = Encoding.ASCII.GetBytes(appSettings?.Secret);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidIssuer = appSettings.Issuer
                };
            });
        }

    }
}
