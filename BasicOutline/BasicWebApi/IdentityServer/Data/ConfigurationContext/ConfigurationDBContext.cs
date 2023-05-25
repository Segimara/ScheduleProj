using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.Data
{
    public class ConfigurationDBContext : DbContext, IConfigurationDbContext
    {
        public DbSet<Client> Clients { get; set; }
        public DbSet<ClientCorsOrigin> ClientCorsOrigins { get; set; }
        public DbSet<IdentityResource> IdentityResources { get; set; }
        public DbSet<ApiResource> ApiResources { get; set; }
        public DbSet<ApiScope> ApiScopes { get; set; }

        public ConfigurationDBContext(DbContextOptions<ConfigurationDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
