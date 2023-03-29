using FluentValidation;

namespace BasicWebApi.Core.App.Event.Queries.GetDetails
{
	public class GetEventDetailsQueryValidator : AbstractValidator<GetEventDetailsQuery>
	{
        public GetEventDetailsQueryValidator()
		{
			RuleFor(x => x.Id).NotEqual(Guid.Empty);
			RuleFor(x => x.UserId).NotEqual(Guid.Empty);
		}
    }
}
