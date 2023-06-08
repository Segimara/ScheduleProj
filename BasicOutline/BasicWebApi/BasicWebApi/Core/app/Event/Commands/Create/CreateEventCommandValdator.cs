using FluentValidation;

namespace BasicWebApi.Core.App.Event.Commands.Create
{
    public class CreateEventCommandValdator : AbstractValidator<CreateEventCommand>
    {
        public CreateEventCommandValdator()
        {
            RuleFor(x => x.UserId).NotEqual(Guid.Empty);
            RuleFor(x => x.Priority).GreaterThan(0);
        }
    }
}
