using MediatR;

namespace BasicWebApi.Core.App.Event.Queries.GetLIst
{
	public class GetEventListQuery : IRequest<EventListVM>
	{
		public Guid UserId { get; set; }
		public DateTime From { get; set; }
		public DateTime To { get; set; }
	}
}
