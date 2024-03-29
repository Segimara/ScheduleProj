﻿using IdentityServer.Data;
using IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using ToDoTask.Identity;

namespace IdentityServer
{
	public class Startup
	{
		IConfiguration Config { get; }
		public Startup(IConfiguration configuration)
		{
			Config = configuration;
		}
		public void ConfigureServices(IServiceCollection services)
		{
			var connectionString = Config.GetValue<string>("DbConnection");
			services.AddDbContext<AuthDBContext>(options =>
			options.UseSqlite(connectionString));
			//services.AddDbContext<ConfigurationDBContext>(opt =>
			//opt.UseSqlite(connectionString));
			services.AddIdentity<AppUser, IdentityRole>(config =>
			{
				config.Password.RequiredLength = 4;
				config.Password.RequireDigit = false;
				config.Password.RequireNonAlphanumeric = false;
				config.Password.RequireLowercase = false;
				config.Password.RequireUppercase = false;
			})
			.AddEntityFrameworkStores<AuthDBContext>()
			.AddDefaultTokenProviders();
			services.AddIdentityServer()
				.AddAspNetIdentity<AppUser>()
				//.AddConfigurationStore<ConfigurationDBContext>(options =>
				//{
				//	options.ConfigureDbContext = builder =>
				//		builder.UseSqlite(connectionString);
				//})
                .AddInMemoryApiResources(Configuration.ApiResources)
				.AddInMemoryClients(Configuration.Clients)
				.AddInMemoryIdentityResources(Configuration.IdentityResources)
				.AddInMemoryApiScopes(Configuration.ApiScopes)
                .AddDeveloperSigningCredential();
			services.ConfigureApplicationCookie(options =>
			{
				options.Cookie.Name = "Shop.Identity.Cookie";
				options.LoginPath = "/Auth/Login";
				options.LogoutPath = "/Auth/Logout";
			});

            services.AddCors(opt =>
            {
                opt.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    policy.AllowAnyOrigin();
                });
            });

            services.AddControllersWithViews();
		}
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
                IdentityModelEventSource.ShowPII = true;
            }
			else
			{
				app.UseExceptionHandler("/Home/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseRouting();
			app.UseIdentityServer();
			app.UseAuthorization();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
						name: "default",
						pattern: "{controller=Auth}/{action=Register}/{id?}");

			});
		}
	}
}
