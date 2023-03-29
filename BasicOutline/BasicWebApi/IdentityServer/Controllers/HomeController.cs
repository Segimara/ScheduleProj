using IdentityServer.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace IdentityServer.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
		private readonly UserManager<AppUser> _userManager;
		private readonly SignInManager<AppUser> _singInManager;
		private readonly IIdentityServerInteractionService _interactionService;
		public HomeController(ILogger<HomeController> logger, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IIdentityServerInteractionService interactionService)
		{
			_interactionService = interactionService;
			_userManager = userManager;
			_singInManager = signInManager;
			_logger = logger;
		}

		public IActionResult Index()
        {
            return RedirectToAction("Login", "Authentication");
        }
		public async Task<IActionResult> Error(string errorId)
		{
			var vm = new ErrorViewModel();

			// retrieve error details from identityserver
			var message = await _interactionService.GetErrorContextAsync(errorId);
			if (message != null)
			{
				vm.Error = message;
			}
			ViewBag.VM = vm;
			return View("Error", vm);
		}
	}
}