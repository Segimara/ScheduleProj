using BasicWebApi.Core.Domain;
using BasicWebApi.Core.Domain.Enums;
using MediatR;

namespace BasicWebApi.Core.App.Event.Commands.Create
{
	public class CreateEventCommand : IRequest<EventModel>
	{
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		//public TypeOfEvent Type { get; set; }
		public int Priotity { get; set; }
		public DateTime DateTimeStart { get; set; }
		public DateTime DateTimeEnd { get; set; }

	}
}
