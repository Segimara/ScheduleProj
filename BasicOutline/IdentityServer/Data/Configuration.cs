using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace ToDoTask.Identity
{
    public class Configuration
    {
        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                new ApiScope("ShopWebApi", "Shop Web Api")
            };
        public static IEnumerable<IdentityResource> IdentityResources =
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        public static IEnumerable<ApiResource> ApiResources =>
            new List<ApiResource>
            {
                new ApiResource("ShopWebApi", "Web Api", new[]{JwtClaimTypes.Name, JwtClaimTypes.Role, JwtClaimTypes.Gender})
                {
                    Scopes = { "ShopWebApi" }
                }
            };
        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    ClientId = "ShopWebApi-swagger",
                    ClientName = "ShopWebApi Swagger",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,
                    RequirePkce = true,
                    RedirectUris =
                    {
                        "https://localhost:7001/oauth2-redirect.html"
                    },
                    AllowedCorsOrigins =
                    {
                        "https://localhost:7001"
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "ShopWebApi"
                    },
                    AllowAccessTokensViaBrowser = true
                },
            };

    }
}
