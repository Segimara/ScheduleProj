using IdentityServer.Models;
using Microsoft.AspNetCore.Mvc;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer.Controllers
{
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _singInManager;
        private readonly IIdentityServerInteractionService _interactionService;
        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IIdentityServerInteractionService interactionService)
        {
            _interactionService = interactionService;
            _userManager = userManager;
            _singInManager = signInManager;
        }
        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl))
            {
                returnUrl = "";
            }
            var viewModel = new LoginViewModel
            {
                ReturnUrl = returnUrl,
            };
            return PartialView(viewModel);
        }
        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return View(viewModel);
            }
            var user = await _userManager.FindByNameAsync(viewModel.Username);
            if (user == null)
            {
                ModelState.AddModelError(String.Empty, "UserNotFound");
                return View(viewModel);
            }
            var result = await _singInManager.PasswordSignInAsync(viewModel.Username, viewModel.Password, false, false);
            if (result.Succeeded)
            {
                return Redirect(viewModel.ReturnUrl);
            }
            ModelState.AddModelError(String.Empty, "Login Error");
            return View(viewModel);
        }
        [HttpGet]
        public async Task<ActionResult> Register(string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl))
            {
                returnUrl = "";
            }
            var viewModel = new RegisterViewModel
            {
                ReturnUrl = returnUrl,
            };
            return PartialView(viewModel);
        }
        [HttpPost]
        public async Task<ActionResult> Register(RegisterViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return View(viewModel);
            }
            var user = new AppUser
            {
                UserName = viewModel.Username,
                DisplayedUsername = viewModel.DisplayedUsername,
            };
            var result = await _userManager.CreateAsync(user, viewModel.Password);
            if (result.Succeeded)
            {
                await _singInManager.SignInAsync(user, false);
                return Redirect(viewModel.ReturnUrl);
            }
            ModelState.AddModelError(String.Empty, "Error occrred");
            return View(viewModel);
        }

        [HttpGet]
        public async Task<ActionResult> Logout(string logoutId)
        {
            await _singInManager.SignOutAsync();
            var logoutRequest = await _interactionService.GetLogoutContextAsync(logoutId);
            return Redirect(logoutRequest.PostLogoutRedirectUri);
        }

        
    }
}
