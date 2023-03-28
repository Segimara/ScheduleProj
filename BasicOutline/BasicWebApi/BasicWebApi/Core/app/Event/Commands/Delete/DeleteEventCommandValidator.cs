using FluentValidation;

namespace BasicWebApi.Core.App.Event.Commands.Delete
{
	public class DeleteEventCommandValidator : AbstractValidator<DeleteEventCommand>
	{
        public DeleteEventCommandValidator()
        {
			RuleFor(x => x.Id).NotEqual(Guid.Empty);
			RuleFor(x => x.UserId).NotEqual(Guid.Empty);
		}
    }
}
