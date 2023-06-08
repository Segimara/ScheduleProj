using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;
using ToDoListWebAPI.Filters;

namespace BasicWebApi
{
	public class SwaggerCFG : IConfigureOptions<SwaggerGenOptions>
	{
		public void Configure(SwaggerGenOptions options)
		{
			options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
			{
				Type = SecuritySchemeType.OAuth2,
				Flows = new OpenApiOAuthFlows
				{
					AuthorizationCode = new OpenApiOAuthFlow
					{
						AuthorizationUrl = new Uri("https://localhost:7000/connect/authorize"),
						TokenUrl = new Uri("https://localhost:7000/connect/token"),
						Scopes = new Dictionary<string, string>
							{
								{"ScheduleWebApi", "Web Api" }
							}
					}
				}

			});
			options.OperationFilter<AuthorizeCheckOperationFilter>();
			options.AddSecurityRequirement(new OpenApiSecurityRequirement
			{
				{
					new OpenApiSecurityScheme
					{
						Reference = new OpenApiReference
						{
							Type = ReferenceType.SecurityScheme,
							Id = $"AuthToken"
						}
					},
					new List<string>()
				}
			});
			options.CustomOperationIds(apiDesctipton =>
				apiDesctipton.TryGetMethodInfo(out MethodInfo methodInfo)
					? methodInfo.Name
					: null);
		}
	}
}
