using BasicWebApi.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BasicWebApi.Data
{
    public class ScheduleDbContext : DbContext, IScheduleDbContext
    {
        public ScheduleDbContext(DbContextOptions<ScheduleDbContext> options) : base(options)
        {
            
        }
    }
}
