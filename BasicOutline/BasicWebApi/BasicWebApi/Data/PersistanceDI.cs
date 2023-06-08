using BasicWebApi.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BasicWebApi.Data
{
    public static class PersistanceDI
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration config)
        {
            var dbConnectionString = config["DbConnection"];
            services.AddDbContext<ScheduleDbContext>(opt =>
            {
                opt.UseSqlite(dbConnectionString);
            });
            services.AddScoped<IScheduleDbContext>(provider =>
                provider.GetService<ScheduleDbContext>());
            return services;
        }
    }
}
