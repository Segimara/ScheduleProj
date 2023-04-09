using BasicWebApi.Core.Domain;
using MediatR;

namespace BasicWebApi.Core.App.Event.Commands.Update
{
	public class UpdateEventCommand : IRequest<EventModel>
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		//public TypeOfEvent Type { get; set; }
		public int Priotity { get; set; }
		public DateTime Start { get; set; }
		public DateTime End { get; set; }
	}
}
