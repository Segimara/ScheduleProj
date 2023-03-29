using MediatR;

namespace BasicWebApi.Core.App.Event.Queries.GetDetails
{
	public class GetEventDetailsQuery : IRequest<EventDetailsVM>
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
	}
}
