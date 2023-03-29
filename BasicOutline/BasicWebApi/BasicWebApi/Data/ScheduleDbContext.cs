using BasicWebApi.Core.Domain;
using BasicWebApi.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BasicWebApi.Data
{
    public class ScheduleDbContext : DbContext, IScheduleDbContext
    {
		public DbSet<ImageModel> Images { get; set; }
		public DbSet<EventModel> Events { get; set; }
		public ScheduleDbContext(DbContextOptions<ScheduleDbContext> options) : base(options)
        {

		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<ImageModel>().HasOne<EventModel>(e => e.Event).WithMany().HasForeignKey(e => e.EventId);
			//modelBuilder.Entity<EventModel>().HasMany<ImageModel>(e => e.Images).WithOne(e => e.Event);
		}
	}
}
