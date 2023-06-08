using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BasicWebApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public abstract class BaseController : ControllerBase
	{
		private IMediator _mediator;
		protected ISender Mediator =>
			_mediator ??= HttpContext.RequestServices.GetService<IMediator>();

		internal Guid UserId => !User.Identity.IsAuthenticated
			? Guid.Empty
			: Guid.Parse(User.FindFirst("sub").Value);
	}
}
