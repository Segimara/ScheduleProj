using BasicWebApi.Core.App;
using BasicWebApi.Core.App.Common.Mapping;
using BasicWebApi.Data;
using BasicWebApi.Data.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Configuration;
using System.Reflection;

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
			builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddPersistence(builder.Configuration);

			builder.Services.AddAuthentication("Bearer")
				.AddIdentityServerAuthentication("Bearer", opt =>
				{
					opt.ApiName = "ScheduleWebApi";
					opt.Authority = Environment.GetEnvironmentVariable("ASPNETCORE_URLS").Split(";")[0];
				});
			builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>,
				SwaggerCFG>();
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
                app.UseSwagger();
                app.UseSwaggerUI(config =>
				{
					config.OAuthClientId("ScheduleWebApi-swagger");
					config.OAuthAppName("ScheduleWebApi Swagger");
					config.OAuthUsePkce();
				});
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
			app.UseAuthentication();
			app.UseCors("AllowAll");

            app.MapControllers();

            app.Run();
        }
    }
}