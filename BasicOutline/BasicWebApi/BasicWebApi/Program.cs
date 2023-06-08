using BasicWebApi.Core.App;
using BasicWebApi.Core.App.Common.Mapping;
using BasicWebApi.Data;
using BasicWebApi.Data.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Swashbuckle.AspNetCore.SwaggerGen;
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
                opt.AddPolicy(name: "MyAllowSpecificOrigins",
                     policy =>
                     {
                         policy.WithOrigins("")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
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
            //app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(x => x
            .AllowAnyOrigin()
            //.WithOrigins("http://localhost:7001", "http://localhost:4200", "https://localhost:7001", "https://localhost:4200", "http://localhost:7000", "https://localhost:7000")
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();
            //app.UseCors("MyAllowSpecificOrigins");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Run();
        }
    }
}