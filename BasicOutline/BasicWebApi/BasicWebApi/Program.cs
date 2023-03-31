using BasicWebApi.Core.App;
using BasicWebApi.Core.App.Common.Mapping;
using BasicWebApi.Data;
using BasicWebApi.Data.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Configuration;
using System.Reflection;
using static System.Net.WebRequestMethods;

namespace BasicWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
			
			// Add services to the container.
			builder.Services.AddAutoMapper(cfg =>
			{
				cfg.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
				cfg.AddProfile(new AssemblyMappingProfile(typeof(IScheduleDbContext).Assembly));
			});
            builder.Services.AddApplication();
            builder.Services.AddPersistence(builder.Configuration);
			builder.Services.AddAuthentication("Bearer")
				.AddIdentityServerAuthentication("Bearer", opt =>
                {
                    opt.ApiName = "ScheduleWebApi";
					opt.SaveToken = true;
					opt.Authority = "https://localhost:7000";
                });
			builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>,
				SwaggerCFG>();
			builder.Services.AddControllers();
			builder.Services.AddSwaggerGen();
			builder.Services.AddCors(opt =>
			{
				opt.AddPolicy("AllowAll", policy =>
				{
					policy.AllowAnyHeader();
					policy.AllowAnyMethod();
					policy.AllowAnyOrigin();
				});
			});

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
			using (var scope = app.Services.CreateScope())
			{
				var services = scope.ServiceProvider;
				try
				{
					var context = services.GetRequiredService<ScheduleDbContext>();
					//DBInitializer.Initialize(context);
				}
				catch (Exception e)
				{
					throw;
				}
			}
			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }
            IdentityModelEventSource.ShowPII = true;
            app.UseSwagger();
                app.UseSwaggerUI(config =>
				{
					config.OAuthClientId("ScheduleWebApi-swagger");
					config.OAuthAppName("ScheduleWebApi Swagger");
					config.OAuthUsePkce();
				});
            app.UseHsts();
            app.UseHttpsRedirection();	
            app.UseRouting();

			app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("AllowAll");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Run();
        }
    }
}