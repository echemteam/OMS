using OMS.Application.Services;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using OMS.Shared.Services.Implementation;

namespace OMS.API
{
    public static class ServiceScope
    {
        public static void ImplementServiceScopes(this IServiceCollection services)
        {
            services.AddScoped<ICommonSettingService, CommonSettingService>();
            services.AddScoped<IServiceManager, ServiceManager>();
            services.AddScoped<IRepositoryManager, RepositoryManager>();
            services.AddScoped<IEmailService, EmailService>();
        }
    }
}
