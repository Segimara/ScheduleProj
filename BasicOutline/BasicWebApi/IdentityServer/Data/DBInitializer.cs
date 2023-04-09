using IdentityServer.Models;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoTask.Identity;

namespace IdentityServer.Data
{
    public class DBInitializer
    {
        public static void Initialize(AuthDBContext authContext, ConfigurationDBContext configContext, IServiceProvider serviceProvider)
        {
            ConfigurationContextInit(configContext);
            AuthContextInit(authContext, serviceProvider);
        }

        private static void AuthContextInit(AuthDBContext context, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetService<UserManager<AppUser>>();
        }
        private static async void ConfigurationContextInit(ConfigurationDBContext configContext)
        {
            if (!configContext.Clients.Any())
            {
                await configContext.Clients.AddRangeAsync(Configuration.Clients.Select(x => x.ToEntity()));
            }
            if (!configContext.IdentityResources.Any())
            {
                await configContext.IdentityResources.AddRangeAsync(Configuration.IdentityResources.Select(x => x.ToEntity()));
            }
            if (!configContext.ApiResources.Any())
            {
                await configContext.ApiResources.AddRangeAsync(Configuration.ApiResources.Select(x => x.ToEntity()));
            }
            if (!configContext.ApiScopes.Any())
            {
                await configContext.ApiScopes.AddRangeAsync(Configuration.ApiScopes.Select(x => x.ToEntity()));
            }
            await configContext.SaveChangesAsync();
        }
    }
}
