using FluentValidation;

namespace BasicWebApi.Core.App.Event.Commands.Delete
{
	public class UpdateEventCommandValidator : AbstractValidator<UpdateEventCommand>
	{
		public UpdateEventCommandValidator()
		{
			RuleFor(x => x.Id).NotEqual(Guid.Empty);
			RuleFor(x => x.UserId).NotEqual(Guid.Empty);
			RuleFor(x => x.Priotity).GreaterThan(0);
		}
	}
}
