using FluentValidation;

namespace BasicWebApi.Core.App.Event.Queries.GetLIst
{
	public class GetEventListQueryValidator : AbstractValidator<GetEventListQuery>
	{
        public GetEventListQueryValidator()
        {
			RuleFor(x => x.UserId).NotEqual(Guid.Empty);
		}
    }
}
