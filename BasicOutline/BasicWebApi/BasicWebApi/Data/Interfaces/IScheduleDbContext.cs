using BasicWebApi.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace BasicWebApi.Data.Interfaces
{
    public interface IScheduleDbContext
    {
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<EventModel> Events { get; set; }

    }
}
